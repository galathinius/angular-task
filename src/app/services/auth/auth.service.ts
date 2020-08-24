import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TokensService } from './../tokens/tokens.service';

type TokenResult = {
  request_token: string;
};
type SessionResult = {
  session_id: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private tokensService: TokensService
  ) {}
  getToken() {
    return this.httpClient.get('authentication/token/new').pipe(
      map((result: TokenResult) => {
        this.tokensService.RequestToken = result.request_token;
        return result.request_token;
      }),
      retry(1),
      catchError(this.handleError)
    );
  }
  getSessionId() {
    const requestBody = { request_token: this.tokensService.RequestToken };
    return this.httpClient.post('authentication/session/new', requestBody).pipe(
      map((result: SessionResult) => {
        this.tokensService.SessionId = result.session_id;
      }),
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
