import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { YearSelectorComponent } from './components/year-selector/year-selector.component';
import { CreateMovieComponent } from './components/create-movie/create-movie/create-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie/edit-movie.component';

@NgModule({
  declarations: [
    MoviesComponent,
    MoviesSearchComponent,
    MoviesSortComponent,
    MovieDetailsComponent,
    MovieFormComponent,
    YearSelectorComponent,
    CreateMovieComponent,
    EditMovieComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MoviesRoutingModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    SharedModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
  ],
  providers: [MoviesService],
  exports: [MoviesRoutingModule],
})
export class MoviesModule {}
