import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

import { AuthData } from '../../../../typings/user';
import { LoaderService } from '../loader/loader.service';
import { PersistenceService } from '../persistence/persistence.service';

const ACCESS_TOKEN_KEY = 'accessToken';

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
        console.error(`AuthService: ${error.error}`, error);
        return throwError(() => error);
      })
    );
  }

  logout() {
    this.authSubject$.next(null);
    this.persistenceService.removeDataFromLocalStorage(ACCESS_TOKEN_KEY);
  }
}
