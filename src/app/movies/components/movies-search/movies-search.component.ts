import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
  tap,
  map,
  filter,
  switchMap,
} from 'rxjs';
import { MoviesService } from '../../services/movies.service';

type SearchForm = {
  title: FormControl<string>;
};

const DEBOUNCE_TIME = 300;

@Component({
  selector: 'objectivity-movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.scss'],
})
export class MoviesSearchComponent implements OnInit, OnDestroy {
  constructor(private moviesService: MoviesService) {}

  private notifier$ = new Subject();

  form = new FormGroup<SearchForm>({
    title: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.moviesService.params$
      .pipe(
        takeUntil(this.notifier$),
        map(({ title }) => title),
        filter((title) => title !== this.form.controls.title.value),
        tap((title) => {
          this.form.controls.title.setValue(title ?? '', {
            emitEvent: false,
          });
        })
      )
      .subscribe();

    this.form.valueChanges
      .pipe(
        takeUntil(this.notifier$),
        distinctUntilChanged(),
        debounceTime(DEBOUNCE_TIME),
        tap(({ title }) => {
          this.moviesService.updateQueryParams({
            title: title ? title : undefined,
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
