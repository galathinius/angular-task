import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface moviesLists {
  results: { poster_path: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}
  getMovies(category: string) {
    const link: string = `https://api.themoviedb.org/3/movie/${category}?api_key`;
    const imageURL: string = 'https://image.tmdb.org/t/p/w500';
    return this.httpClient.get(link).pipe(
      map((movies: moviesLists) =>
        movies.results.map((res) => ({
          posterPath: `${imageURL}${res.poster_path}`,
        }))
      ),
      catchError((err) => of([{ posterPath: '../assets/imageMissing.jpg' }]))
    );
  }
}
