import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatestWith, tap, Subject, takeUntil } from 'rxjs';
import { MoviesService } from 'src/app/movies/services/movies.service';
import { Movie } from 'src/typings/movie';

@Component({
  selector: 'objectivity-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router
  ) {}

  private notifier$ = new Subject();

  movie: Movie | null;

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.notifier$),
        combineLatestWith(this.moviesService.movies$),
        tap(([params, movies]) => {
          this.movie =
            movies.find((movie) => movie.id === params['id']) ?? null;
        })
      )
      .subscribe();
  }

  editMovie(movie: Movie) {
    if (
      movie.director === this.movie?.director &&
      movie.duration === this.movie.duration &&
      movie.image === this.movie.image &&
      movie.rate === this.movie.rate &&
      movie.title === this.movie.title &&
      movie.year === this.movie.year
    ) {
      return;
    }

    this.moviesService
      .editMovie(movie)
      .pipe(
        tap(() => {
          this.router.navigate(['/movies']);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }
}
