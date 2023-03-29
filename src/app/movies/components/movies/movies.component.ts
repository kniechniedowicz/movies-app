import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
    public loaderService: LoaderService
  ) {}
  private notifier = new Subject();

  displayedColumns: string[] = ['title', 'rate'];
  movies: Movie[];

  ngOnInit(): void {
    this.moviesService.movies$
      .pipe(takeUntil(this.notifier))
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  ngOnDestroy(): void {
    this.notifier.next(null);
    this.notifier.complete();
  }
}
