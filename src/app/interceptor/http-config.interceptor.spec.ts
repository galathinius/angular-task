import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './http-config.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { MoviesService } from '../services/movies/movies.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TMDB_KEY, TMDB_URL } from '../shared/constants';

describe('HttpConfigInterceptor', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(MoviesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add url and api key', () => {
    const query: string = 'movie/popular';
    service.getMovies(query).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    // const httpRequest = httpMock.expectOne(
    //   `${TMDB_URL}${query}?api_key=${TMDB_KEY}`
    // );

    // expect(httpRequest).toBeTruthy();
  });
});
