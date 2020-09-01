import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokensService {
  constructor() {}
  set RequestToken(token: string) {
    localStorage.setItem('request_token', token);
  }
  get RequestToken(): string {
    return localStorage.getItem('request_token');
  }
  set SessionId(id: string) {
    localStorage.setItem('session_id', id);
  }
  get SessionId(): string {
    return localStorage.getItem('session_id');
  }
}
