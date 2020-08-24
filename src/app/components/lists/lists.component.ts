import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies/movies.service';
import { Subscription } from 'rxjs';
import { MovieResponse } from '../../shared/models';

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
  public items: MovieResponse[];
  private subs: Subscription;

  constructor(private moviesService: MoviesService) {}

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
