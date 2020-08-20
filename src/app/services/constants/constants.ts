export const TMDB_KEY: string = '?api_key=06f99320c4d4aafa43383b3d6c8da151';
export const TMDB_URL: string = 'https://api.themoviedb.org/3/';

export type MovieResponse = {
  posterPath: string;
};
export interface MoviesLists {
  results: { poster_path: string }[];
}
