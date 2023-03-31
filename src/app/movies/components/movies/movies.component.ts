import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Movie } from '../../../../typings/movie';
import { UrlParams } from '../../../../typings/query-params';

import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'objectivity-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  constructor(
    private moviesService: MoviesService,
    public loaderService: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  private notifier$ = new Subject();

  displayedColumns: string[] = ['title', 'rate', 'actions'];
  movies: Movie[];
  selectedMovie: Movie;

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        take(1),
        map((params) => ({ title: params['title'], _order: params['order'] })),
        tap((params) => {
          this.moviesService.updateQueryParams(params);
        }),
        switchMap(() => this.moviesService.loadMovies())
      )
      .subscribe();

    this.moviesService.movies$
      .pipe(takeUntil(this.notifier$))
      .subscribe((movies) => {
        this.movies = movies;
      });

    this.moviesService.params$
      .pipe(
        takeUntil(this.notifier$),
        tap(({ title, _order }) => {
          this.updateUrlParams({ title, order: _order });
        })
      )
      .subscribe();
  }

  updateUrlParams(queryParams: UrlParams) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      replaceUrl: true,
    });
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }
}
