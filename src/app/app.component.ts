import { Component, OnInit } from '@angular/core';
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
    this.authService.loadUserData().subscribe();
  }
}
