import { Component, Input } from '@angular/core';
import { Movie } from '../../services/movie.model';

@Component({
  selector: 'objectivity-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent {
  @Input() movies: Movie[];
}
