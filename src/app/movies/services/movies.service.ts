import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Movie } from './movie.model';
import { LoaderService } from '../../core/services/loader/loader.service';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  private subject = new BehaviorSubject<Movie[]>([]);

  movies$ = this.subject.asObservable();

  loadMoviesByTitle(title?: string): Observable<Movie[]> {
    const url = title ? `/api/movies?title=${title}` : '/api/movies';
    return this.http.get<Movie[]>(url).pipe(
      this.loaderService.showLoaderUntilCompleted,
      tap((movies) => {
        this.subject.next(movies);
      }),
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }
}
