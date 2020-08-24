import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TMDB_KEY, TMDB_URL } from '../shared/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const QUERY: string = request.url;

    const httpsReq = request.clone({
      url: `${TMDB_URL}${QUERY}?api_key=${TMDB_KEY}`,
    });

    return next.handle(httpsReq);
  }
}
