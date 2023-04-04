import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { MoviesService } from 'src/app/movies/services/movies.service';
import { Movie } from 'src/typings/movie';

@Component({
  selector: 'objectivity-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
})
export class CreateMovieComponent {
  constructor(private moviesService: MoviesService, private router: Router) {}

  createMovie(movie: Movie): void {
    this.moviesService
      .createMovie(movie)
      .pipe(
        tap(() => {
          this.router.navigate(['/movies']);
        })
      )
      .subscribe();
  }
}
