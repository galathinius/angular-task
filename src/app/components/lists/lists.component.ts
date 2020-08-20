import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies/movies.service';
import { Subscription } from 'rxjs';
import { MovieResponse } from './../../services/constants/constants';

enum Categories {
  nowPlaying = 'now_playing',
  popular = 'popular',
  upcoming = 'upcoming',
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  @Input('category')
  category: Categories;
  constructor(private moviesService: MoviesService) {}

  items: MovieResponse[];
  subs: Subscription;

  ngOnInit(): void {
    this.subs = this.moviesService
      .getMovies(this.category)
      .subscribe((resp) => {
        this.items = resp;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
