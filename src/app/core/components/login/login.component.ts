import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'objectivity-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}

  password: string;
  email: string;
  error: null | string;

  onSubmit() {
    this.auth
      .login(this.email, this.password)
      .pipe(
        tap(() => {
          this.router.navigate(['/movies']);
        }),
        catchError((error: HttpErrorResponse) => {
          this.error = error.error;
          return EMPTY;
        })
      )
      .subscribe();
  }
}
