import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'objectivity-movies-sort',
  templateUrl: './movies-sort.component.html',
  styleUrls: ['./movies-sort.component.scss'],
})
export class MoviesSortComponent implements OnInit, OnDestroy {
  constructor(private moviesService: MoviesService) {}

  options = ['asc', 'desc'];

  notifier$ = new Subject();

  form = new FormGroup({
    order: new FormControl('', { nonNullable: true }),
  });

  ngOnInit() {
    this.moviesService.params$
      .pipe(
        takeUntil(this.notifier$),
        map(({ _order }) => _order),
        filter((order) => order !== this.form.controls.order.value),
        tap((order) => {
          this.form.controls.order.setValue(order ?? '', {
            emitEvent: false,
          });
        })
      )
      .subscribe();

    this.form.valueChanges
      .pipe(
        takeUntil(this.notifier$),
        tap(({ order }) => {
          this.moviesService.updateQueryParams({
            _order: order ? order : undefined,
          });
        }),
        switchMap(() => this.moviesService.loadMovies())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }
}
