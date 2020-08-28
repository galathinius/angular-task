import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };
  let tokenSpy: { RequestToken: jasmine.Spy; SessionId: jasmine.Spy };
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    tokenSpy = jasmine.createSpyObj('tokenSpy', ['RequestToken', 'SessionId']);
    service = new AuthService(httpClientSpy as any, tokenSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getToken function', () => {
    expect(service.getToken).toBeTruthy();
  });

  it('should have getSessionId function', () => {
    expect(service.getSessionId).toBeTruthy();
  });

  it('should return expected request token', () => {
    type TokenResult = {
      request_token: string;
    };

    const expectedToken: TokenResult = { request_token: '123' };

    httpClientSpy.get.and.returnValue(of(expectedToken));

    service
      .getToken()
      .subscribe(
        (response) => expect(response).toEqual('123', 'expected token'),
        fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should get and set the session id', () => {
    type SessionResult = {
      session_id: string;
    };
    const expectedSession: SessionResult = { session_id: '123' };

    httpClientSpy.post.and.returnValue(of(expectedSession));

    service.getSessionId().subscribe();
    expect(tokenSpy.SessionId).toEqual('123');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.and.throwError(errorResponse);

    expect(() => {
      service.getToken();
    }).toThrow();
  });
});
