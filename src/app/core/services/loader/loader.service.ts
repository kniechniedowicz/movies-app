import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCompleted = <T>(obs$: Observable<T>): Observable<T> => {
    this.loadingOn();

    return obs$.pipe(finalize(() => this.loadingOff()));
  };

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
