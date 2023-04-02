import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistenceService } from '../persistence/persistence.service';
import { ACCESS_TOKEN_KEY } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private persistanceService: PersistenceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken =
      this.persistanceService.getDataFromLocalStorage(ACCESS_TOKEN_KEY);

    if (!accessToken) {
      return next.handle(request);
    }

    const clonedReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
    });

    return next.handle(clonedReq);
  }
}
