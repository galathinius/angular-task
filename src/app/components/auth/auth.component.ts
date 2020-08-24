import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public logInLink: string;
  private subs: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subs = this.authService.getToken().subscribe((resp) => {
      this.logInLink = `https://www.themoviedb.org/authenticate/${resp}?redirect_to=http://localhost:4200/`;
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
