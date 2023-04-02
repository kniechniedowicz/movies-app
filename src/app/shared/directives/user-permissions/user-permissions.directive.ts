import {
  Directive,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Directive({
  selector: '[objectivityUserPermissions]',
})
export class UserPermissionsDirective implements OnInit, OnDestroy {
  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewRef: ViewContainerRef,
    private auth: AuthService
  ) {}

  notifier$ = new Subject();

  ngOnInit(): void {
    this.auth.userData$
      .pipe(takeUntil(this.notifier$))
      .subscribe((userData) => {
        if (userData && userData.user.isAdmin) {
          this.viewRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewRef.clear();
        }
      });
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }
}
