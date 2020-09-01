import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MovieResponse, MoviesLists } from '../../shared/models';

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
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
