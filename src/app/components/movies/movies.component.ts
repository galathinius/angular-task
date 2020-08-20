import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  constructor(private authService: AuthService) {}

  subs: Subscription;
  req_token = localStorage.getItem('request_token');
  ngOnInit(): void {
    this.subs = this.authService
      .getSessionId(this.req_token)
      .subscribe((resp: any) => {
        localStorage.setItem('session_id', resp.session_id);
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
