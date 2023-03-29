import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, tap, throwError } from 'rxjs';
import { Movie } from './movie.model';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {
    this.loadAllMovies();
  }

  private subject = new BehaviorSubject<Movie[]>([]);

  movies$ = this.subject.asObservable();

  loadAllMovies() {
    this.http
      .get<Movie[]>('/api/movies')
      .pipe(
        tap((movies) => {
          this.subject.next(movies);
        }),
        catchError((err) => {
          console.error(err);
          return of([]);
        })
      )
      .subscribe();
  }
}
