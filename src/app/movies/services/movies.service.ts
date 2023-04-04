import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Movie } from '../../../typings/movie';
import { LoaderService } from '../../core/services/loader/loader.service';
import { QueryParams } from '../../../typings/query-params';
import { stringify } from 'qs';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_PARAMS: QueryParams = {
  _sort: 'rate',
  title: undefined,
  _order: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  private subject$ = new BehaviorSubject<Movie[]>([]);

  private paramsSubject$ = new BehaviorSubject<QueryParams>(DEFAULT_PARAMS);

  params$ = this.paramsSubject$.asObservable();

  movies$ = this.subject$.asObservable();

  loadMovies(): Observable<Movie[]> {
    const params = this.paramsSubject$.value;

    const url =
      !params.title && !params._order
        ? '/api/movies'
        : `/api/movies${stringify(params, { addQueryPrefix: true })}`;

    return this.http.get<Movie[]>(url).pipe(
      this.loaderService.showLoaderUntilCompleted,
      tap((movies) => {
        this.subject$.next(movies);
      }),
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }

  updateQueryParams(params: Omit<QueryParams, 'sort'>) {
    this.paramsSubject$.next({ ...this.paramsSubject$.value, ...params });
  }

  createMovie(date: Movie) {
    const movie = { ...date, id: uuidv4() };

    return this.http.post('/api/movies', movie).pipe(
      this.loaderService.showLoaderUntilCompleted,
      tap(() => {
        this.subject$.next([...this.subject$.value, movie]);
      })
    );
  }

  editMovie(movie: Movie) {
    return this.http.put(`/api/movies/${movie.id}`, movie).pipe(
      this.loaderService.showLoaderUntilCompleted,
      tap(() => {
        const index = this.subject$.value.findIndex(
          (item) => item.id === movie.id
        );

        const left = this.subject$.value.slice(0, index);
        const right = this.subject$.value.slice(index + 1);

        this.subject$.next([...left, movie, ...right]);
      })
    );
  }
}
