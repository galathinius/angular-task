import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokensService {
  constructor() {}
  setRequestToken(token: string): void {
    localStorage.setItem('request_token', token);
  }
  getRequestToken(): string {
    return localStorage.getItem('request_token');
  }
  setSessionId(id: string): void {
    localStorage.setItem('session_id', id);
  }
  getSessionId(): string {
    return localStorage.getItem('session_id');
  }
}
