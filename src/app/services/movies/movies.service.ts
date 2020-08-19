import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const tmdbKey: string = '06f99320c4d4aafa43383b3d6c8da151';
const imageURL: string = 'https://image.tmdb.org/t/p/w500';
interface moviesLists {
  results: { poster_path: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}
  getMovies(category: string) {
    const link: string = `https://api.themoviedb.org/3/movie/${category}?api_key=${tmdbKey}`;
    return this.httpClient.get(link).pipe(
      map((movies: moviesLists) =>
        movies.results.map((res) => ({
          posterPath: `${imageURL}${res.poster_path}`,
        }))
      )
    );
  }
}
