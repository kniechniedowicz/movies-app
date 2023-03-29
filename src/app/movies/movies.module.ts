import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieComponent } from './components/movie/movie.component';
import { MoviesService } from './services/movies.service';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MoviesComponent, MoviesListComponent, MovieComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    HttpClientModule,
    MatTableModule,
    SharedModule,
  ],
  providers: [MoviesService],
  exports: [MoviesRoutingModule],
})
export class MoviesModule {}
