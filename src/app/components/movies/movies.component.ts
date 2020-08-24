import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  private subs: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subs = this.authService.getSessionId().subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
