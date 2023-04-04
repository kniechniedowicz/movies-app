import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';

import { AuthData, User } from '../../../../typings/user';
import { LoaderService } from '../loader/loader.service';
import { PersistenceService } from '../persistence/persistence.service';

export const ACCESS_TOKEN_KEY = 'accessToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private persistenceService: PersistenceService,
    private loaderService: LoaderService
  ) {}

  private authSubject$ = new BehaviorSubject<AuthData | null>(null);

  userData$ = this.authSubject$.asObservable();

  isAuthenticated(): Observable<boolean> {
    return this.userData$.pipe(map(Boolean));
  }

  login(email: string, password: string): Observable<AuthData> {
    return this.http.post<AuthData>('/api/login', { email, password }).pipe(
      this.loaderService.showLoaderUntilCompleted,
      tap(({ accessToken }) => {
        this.persistenceService.saveDataToLocalStorage(
          ACCESS_TOKEN_KEY,
          accessToken
        );
      }),
      tap((data) => {
        this.authSubject$.next(data);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(`AuthService login: ${error.error}`, error);
        return throwError(() => error);
      })
    );
  }

  getUser(): User | null {
    return this.authSubject$.value?.user ?? null;
  }

  loadUserData(): Observable<AuthData> {
    const accessToken =
      this.persistenceService.getDataFromLocalStorage(ACCESS_TOKEN_KEY);

    if (!accessToken) {
      return EMPTY;
    }

    return this.http.get<AuthData>('/api/me').pipe(
      this.loaderService.showLoaderUntilCompleted,
      tap((authData) => {
        this.authSubject$.next(authData);
      }),
      catchError((error: HttpErrorResponse) => {
        this.logout();
        console.error(`AuthService loadUserData: ${error.error}`, error);
        return throwError(() => error);
      })
    );
  }

  logout() {
    this.authSubject$.next(null);
    this.persistenceService.removeDataFromLocalStorage(ACCESS_TOKEN_KEY);
  }
}
