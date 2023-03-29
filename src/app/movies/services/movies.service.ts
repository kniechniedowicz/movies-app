import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { Movie } from './movie.model';
import { LoaderService } from '../../core/services/loader/loader.service';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {
    this.loadAllMovies();
  }

  private subject = new BehaviorSubject<Movie[]>([]);

  movies$ = this.subject.asObservable();

  loadAllMovies() {
    this.http
      .get<Movie[]>('/api/movies')
      .pipe(
        this.loaderService.showLoaderUntilCompleted,
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
