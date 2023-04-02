import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, tap } from 'rxjs';
import { PersistenceService } from '../persistence/persistence.service';
import { ACCESS_TOKEN_KEY, AuthService } from './auth.service';

export const isAuthenticatedRoute: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const persistanceService = inject(PersistenceService);
  const auth = inject(AuthService);

  return auth.isAuthenticated().pipe(
    map((isAuthenticated) => {
      const hasAccessToken = Boolean(
        persistanceService.getDataFromLocalStorage(ACCESS_TOKEN_KEY)
      );
      return isAuthenticated || hasAccessToken;
    }),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
      }
    })
  );
};
