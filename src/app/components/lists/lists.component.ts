import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  @Input('category')
  category: string = '';
  constructor(private apiService: MoviesService) {}

  Items;

  subs: Subscription;

  ngOnInit(): void {
    this.subs = this.apiService
      .getData(this.category)
      .subscribe((resp: any) => {
        this.Items = resp;
      });
    // this.subs.unsubscribe();
  }
}
