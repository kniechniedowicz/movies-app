import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { rateValidator } from './rate-validator';
import { numericRegExp } from 'src/app/variables';
import { Movie } from 'src/typings/movie';

type MovieForm = {
  title: FormControl<string | null>;
  rate: FormControl<number | null>;
  duration: FormControl<number | null>;
  director: FormControl<string | null>;
  year: FormControl<number | null>;
  image?: FormControl<string>;
};

@Component({
  selector: 'objectivity-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
  providers: [],
})
export class MovieFormComponent implements OnInit {
  @Input()
  movie: Movie | null;

  @Output()
  handleSubmit = new EventEmitter();

  form = new FormGroup<MovieForm>({
    title: new FormControl(null, {
      validators: [Validators.required],
    }),
    rate: new FormControl(null, {
      validators: [Validators.required, rateValidator],
    }),
    duration: new FormControl(null, {
      validators: [Validators.required, Validators.pattern(numericRegExp)],
    }),
    director: new FormControl(null, {
      validators: [Validators.required],
    }),
    year: new FormControl(null, {
      validators: [Validators.required],
    }),
    image: new FormControl(),
  });

  ngOnInit() {
    if (!this.movie) {
      return;
    }

    this.form.setValue({
      title: this.movie.title,
      rate: this.movie.rate,
      duration: this.movie.duration,
      director: this.movie.director,
      year: this.movie.year,
      image: this.movie.image ?? '',
    });
  }

  onSubmit() {
    const moviePayload = {
      id: this.movie?.id || undefined,
      title: this.form.controls.title.value ?? '',
      rate: Number(this.form.controls.rate.value) ?? 0,
      duration: Number(this.form.controls.duration.value) ?? 0,
      director: this.form.controls.director.value ?? '',
      image: this.form.controls.image?.value,
      year: this.form.controls.year.value ?? 0,
    };

    this.handleSubmit.emit(moviePayload);
  }
}
