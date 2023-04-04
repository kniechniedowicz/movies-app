import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedRoute } from '../core/services/auth/authenticated-route.guard';
import { isAdminGuard } from '../core/services/auth/is-admin.guard';
import { CreateMovieComponent } from './components/create-movie/create-movie/create-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie/edit-movie.component';
import { MoviesComponent } from './components/movies/movies.component';

const routes: Routes = [
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [isAuthenticatedRoute],
  },
  {
    path: 'movies/new',
    component: CreateMovieComponent,
    canActivate: [isAdminGuard],
  },
  {
    path: 'movies/:id',
    component: EditMovieComponent,
    canActivate: [isAdminGuard],
  },
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
