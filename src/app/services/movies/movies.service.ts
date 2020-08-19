import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const tmdbKey: string = '06f99320c4d4aafa43383b3d6c8da151';
const imageURL: string = 'https://image.tmdb.org/t/p/w500';

const getLink = (category: string): string =>
  `https://api.themoviedb.org/3/movie/${category}?api_key=${tmdbKey}`;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}
  getData(category: string) {
    return this.httpClient.get(getLink(category)).pipe(
      map((movies: any) =>
        movies.results.map((res) => ({
          posterPath: `${imageURL}${res.poster_path}`,
        }))
      ),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
