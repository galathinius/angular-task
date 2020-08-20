import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

type tokenResult = {
  request_token: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  getToken() {
    return this.httpClient.get('authentication/token/new').pipe(
      map((result: tokenResult) => result.request_token),
      catchError((err) => throwError(err))
    );
  }
  getSessionId(token) {
    const requestBody = { request_token: token };
    return this.httpClient
      .post('authentication/session/new', requestBody)
      .pipe(catchError((err) => throwError(err)));
  }
}
