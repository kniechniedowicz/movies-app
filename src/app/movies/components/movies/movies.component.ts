import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Movie, MovieWithFavourites } from '../../../../typings/movie';
import { UrlParams } from '../../../../typings/query-params';

import { MoviesService } from '../../services/movies.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FavouritesService } from '../../services/favourites/favourites.service';

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
    private auth: AuthService,
    private favouritesService: FavouritesService,
    private activatedRoute: ActivatedRoute
  ) {}
  private notifier$ = new Subject();

  displayedColumns: string[] = ['title', 'rate', 'actions', 'favourites'];
  movies: MovieWithFavourites[] = [];
  selectedMovie: Movie | null = null;

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

    this.auth.userData$
      .pipe(
        takeUntil(this.notifier$),
        tap((authData) => {
          if (!authData) {
            return;
          }

          this.favouritesService.loadFavourites(authData.user.id);
        })
      )
      .subscribe();

    this.favouritesService.favourites$
      .pipe(
        takeUntil(this.notifier$),
        map(() => {
          this.movies = this.moviesService.mergeMoviesWithFavourites(
            this.movies
          );
        })
      )
      .subscribe();

    this.moviesService.movies$
      .pipe(takeUntil(this.notifier$))
      .subscribe((movies) => {
        this.movies = this.moviesService.mergeMoviesWithFavourites(movies);
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

  addToFavourites(movie: MovieWithFavourites) {
    if (movie.isAddedToFavourites) {
      return;
    }

    const user = this.auth.getUser();

    if (!user) {
      return;
    }

    this.favouritesService.addToFavourites(movie.id, user.id);
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  onSearchHandler() {
    this.selectedMovie = null;
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }
}
