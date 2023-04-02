import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedRoute } from '../core/services/auth/authenticated-route.guard';
import { MoviesComponent } from './components/movies/movies.component';

const routes: Routes = [
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [isAuthenticatedRoute],
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
