import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MovieResponse, MoviesLists } from './../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}
  getMovies(category: string): Observable<MovieResponse[]> {
    const link: string = `movie/${category}`;
    const imageURL: string = 'https://image.tmdb.org/t/p/w500';
    return this.httpClient.get(link).pipe(
      map((movies: MoviesLists) =>
        movies.results.map((res) => ({
          posterPath: `${imageURL}${res.poster_path}`,
        }))
      ),
      catchError((err) => throwError(err))
    );
  }
}
