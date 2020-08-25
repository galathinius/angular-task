import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MoviesService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });
    service = TestBed.inject(MoviesService);
    service = new MoviesService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
