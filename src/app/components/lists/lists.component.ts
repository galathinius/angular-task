import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies/movies.service';
import { Subscription } from 'rxjs';

enum Categories {
  nowPlaying = 'now_playing',
  popular = 'popular',
  upcoming = 'upcoming',
}

type MovieResponse = {
  posterPath: string;
};

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  @Input('category')
  category: Categories;
  constructor(private apiService: MoviesService) {}

  items: MovieResponse[];
  subs: Subscription;

  ngOnInit(): void {
    this.subs = this.apiService.getMovies(this.category).subscribe(
      (resp) => {
        this.items = resp;
        // console.log(resp);
      },
      (err) => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
