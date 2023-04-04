import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'qs';
import { BehaviorSubject, catchError, map, of, tap, throwError } from 'rxjs';
import { Favourite } from '../../../../typings/favourites';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private subject$ = new BehaviorSubject<Favourite[]>([]);

  favourites$ = this.subject$.asObservable();

  getFavourites(userId: string) {
    this.http
      .get<Favourite[]>(
        `/api/favourites/${stringify({ userId }, { addQueryPrefix: true })}`
      )
      .pipe(
        map((favourites) => {
          this.subject$.next(favourites);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(
            `FavouritesService getFavourites: ${error.error}`,
            error
          );
          return of([]);
        })
      )
      .subscribe();
  }

  addToFavourites(movieId: string, userId: string) {
    this.http
      .post<Favourite>(`/api/favourites`, { userId, movieId })
      .pipe(
        tap((favourite) => {
          this.subject$.next([...this.subject$.value, favourite]);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(
            `FavouritesService addToFavourites: ${error.error}`,
            error
          );
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}
