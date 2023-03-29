import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Movie } from '../../services/movie.model';

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
  private notifier = new Subject();

  displayedColumns: string[] = ['title', 'rate'];
  movies: Movie[];
  title?: string;

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.notifier),
        map((params) => params['title']),
        tap((title) => {
          this.title = title;
        }),
        switchMap((title) => this.moviesService.loadMoviesByTitle(title))
      )
      .subscribe();

    this.moviesService.movies$
      .pipe(takeUntil(this.notifier))
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  updateQueryParams(title?: string) {
    const queryParams = title ? { title } : {};

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      replaceUrl: true,
    });
  }

  ngOnDestroy(): void {
    this.notifier.next(null);
    this.notifier.complete();
  }
}
