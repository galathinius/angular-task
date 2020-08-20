import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService) {}

  subs: Subscription;
  logInLink: string;

  ngOnInit(): void {
    this.subs = this.authService.getToken().subscribe((resp) => {
      localStorage.setItem('request_token', resp);
      this.logInLink = `https://www.themoviedb.org/authenticate/${resp}?redirect_to=http://localhost:4200/`;
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
