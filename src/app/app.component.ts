import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'objectivity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'movies-app';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserData().pipe(take(1)).subscribe();
  }
}
