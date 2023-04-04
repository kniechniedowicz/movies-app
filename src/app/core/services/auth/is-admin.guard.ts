import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from './auth.service';

export const isAdminGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const router = inject(Router);

  return inject(AuthService).userData$.pipe(
    map((authData) => Boolean(authData?.user.isAdmin)),
    tap((isAdmin) => {
      if (isAdmin) {
        return;
      }

      router.navigate(['/movies']);
    })
  );
};
