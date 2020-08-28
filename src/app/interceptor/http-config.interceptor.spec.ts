import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './http-config.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { MoviesService } from '../services/movies/movies.service';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { TMDB_KEY, TMDB_URL } from '../shared/constants';

describe('AuthInterceptor', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add url and api key without another service', () => {
    const handler = jasmine.createSpyObj('HttpHandler', ['handle']);

    const interceptor = new AuthInterceptor();
    const request = new HttpRequest('POST', 'test', null);
    interceptor.intercept(request, handler);
    const nextRequest = handler.handle;
    // console.log(nextRequest.calls.first().args[0]);
    // console.log(nextRequest.calls.allArgs()[0][0]);
    expect(nextRequest.calls.first().args[0].url).toBe(
      `${TMDB_URL}test?api_key=${TMDB_KEY}`
    );
  });

  //testing with another service
  {
    // beforeEach(() => {
    //   TestBed.configureTestingModule({
    //     imports: [HttpClientTestingModule],
    //     providers: [
    //       AuthInterceptor,
    //       {
    //         provide: HTTP_INTERCEPTORS,
    //         useClass: AuthInterceptor,
    //         multi: true,
    //       },
    //     ],
    //   });
    //   service = TestBed.get(MoviesService);
    //   httpMock = TestBed.get(HttpTestingController);
    // });
    // afterEach(() => {
    //   httpMock.verify();
    // });
    // it('should add url and api key', () => {
    //   const query: string = 'test';
    //   service.getMovies(query).subscribe((response) => {
    //     expect(response).toBeTruthy();
    //   });
    //   const httpRequest = httpMock.expectOne(
    //     `${TMDB_URL}movie/${query}?api_key=${TMDB_KEY}`
    //   );
    //   expect(httpRequest).toBeTruthy();
    // });
  }
});

// test pe error handling, interceptor test fara service
