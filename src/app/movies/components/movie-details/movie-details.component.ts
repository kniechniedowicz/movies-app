import { Component, Input } from '@angular/core';
import { Movie } from 'typings/movie';

@Component({
  selector: 'objectivity-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  @Input()
  movie: Movie;
}
