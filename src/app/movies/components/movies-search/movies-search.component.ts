import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  switchMap,
  takeUntil,
  tap,
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

  @Input()
  title?: string;

  @Output()
  updateQueryParams = new EventEmitter<string | undefined>();

  private notifier = new Subject();

  form = new FormGroup<SearchForm>({
    title: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.form.controls.title.setValue(this.title ?? '');
    this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(DEBOUNCE_TIME),
        tap(({ title }) => {
          this.updateQueryParams.emit(title);
        }),
        takeUntil(this.notifier),
        switchMap(({ title }) => {
          return this.moviesService.loadMoviesByTitle(title ?? '');
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.notifier.next(null);
    this.notifier.complete();
  }
}
