import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
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
        this.tokensService.setRequestToken(result.request_token);
        return result.request_token;
      }),
      catchError((err) => throwError(err))
    );
  }
  getSessionId() {
    const requestBody = { request_token: this.tokensService.getRequestToken() };
    return this.httpClient.post('authentication/session/new', requestBody).pipe(
      map((result: SessionResult) => {
        this.tokensService.setSessionId(result.session_id);
      }),
      catchError((err) => throwError(err))
    );
  }
}
