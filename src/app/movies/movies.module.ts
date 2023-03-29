import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieComponent } from './components/movie/movie.component';
import { MoviesService } from './services/movies.service';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { MoviesSearchComponent } from './components/movies-search/movies-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MoviesSortComponent } from './components/movies-sort/movies-sort.component';

@NgModule({
  declarations: [MoviesComponent, MovieComponent, MoviesSearchComponent, MoviesSortComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    HttpClientModule,
    MatTableModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
  ],
  providers: [MoviesService],
  exports: [MoviesRoutingModule],
})
export class MoviesModule {}
