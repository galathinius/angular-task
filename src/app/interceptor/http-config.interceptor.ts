import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const TMDB_KEY: string = '06f99320c4d4aafa43383b3d6c8da151';
    const httpsReq = request.clone({
      url: request.url.replace('api_key', `api_key=${TMDB_KEY}`),
    });

    return next.handle(httpsReq);
  }
}
