import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpEvent,
  HttpHandler,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { UserAuthService } from '../authservice/user-auth.service';

import { AuthInterceptor } from './auth.interceptor.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let httpMock: HttpTestingController;
  let authService: UserAuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthInterceptor,
        UserAuthService,
        { provide: Router, useValue: { navigate: () => {} } },
      ],
    });

    interceptor = TestBed.inject(AuthInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(UserAuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should pass through request with No-Auth header', () => {
    const req = new HttpRequest('GET', '/api/data', {
      headers: { 'No-Auth': 'True' },
    });

    interceptor
      .intercept(req, {} as HttpHandler)
      .subscribe((event: HttpEvent<any>) => {
        expect(event).toBeTruthy();
        expect(event.type).toBe(0);
      });

    const httpRequest = httpMock.expectOne('/api/data');
    expect(httpRequest.request).toBe(req);
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();

    httpRequest.flush({});
  });

  it('should add token to request headers', () => {
    spyOn(authService, 'getToken').and.returnValue('testToken');

    const req = new HttpRequest('GET', '/api/data');

    interceptor
      .intercept(req, {} as HttpHandler)
      .subscribe((event: HttpEvent<any>) => {
        expect(event).toBeTruthy();
        expect(event.type).toBe(0);
      });

    const httpRequest = httpMock.expectOne('/api/data');
    expect(httpRequest.request.headers.get('Authorization')).toBe(
      'Bearer testToken'
    );

    httpRequest.flush({});
  });

  it('should handle 401 Unauthorized error', fakeAsync(() => {
    spyOn(router, 'navigate');

    const req = new HttpRequest('GET', '/api/data');
    const errorResponse = new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized',
    });

    interceptor
      .intercept(req, {} as HttpHandler)
      .subscribe(
        () => {},
        (error: any) => {
          expect(error).toBeTruthy();
          expect(error).toBe('Some thing is wrong');
        }
      );

    const httpRequest = httpMock.expectOne('/api/data');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();

    const event = new ErrorEvent('error', {
      error: errorResponse,
    });

    httpRequest.error(event);

    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should handle 403 Forbidden error', fakeAsync(() => {
    spyOn(router, 'navigate');

    const req = new HttpRequest('GET', '/api/data');
    const errorResponse = new HttpErrorResponse({
      status: 403,
      statusText: 'Forbidden',
    });

    interceptor
      .intercept(req, {} as HttpHandler)
      .subscribe(
        () => {},
        (error: any) => {
          expect(error).toBeTruthy();
          expect(error).toBe('Some thing is wrong');
        }
      );

    const httpRequest = httpMock.expectOne('/api/data');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();

    const event = new ErrorEvent('error', {
      error: errorResponse,
    });

    httpRequest.error(event);

    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/forbidden']);
  }));

  it('should handle other error statuses', fakeAsync(() => {
    spyOn(console, 'log');

    const req = new HttpRequest('GET', '/api/data');
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
    });

    interceptor
      .intercept(req, {} as HttpHandler)
      .subscribe(
        () => {},
        (error: any) => {
          expect(error).toBeTruthy();
          expect(error).toBe('Some thing is wrong');
        }
      );

    const httpRequest = httpMock.expectOne('/api/data');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();

    const event = new ErrorEvent('error', {
      error: errorResponse,
    });

    httpRequest.error(event);

    tick();

    expect(console.log).toHaveBeenCalledWith(500);
  }));

  it('should handle request error', fakeAsync(() => {
    spyOn(console, 'log');

    const req = new HttpRequest('GET', '/api/data');

    interceptor
      .intercept(req, {} as HttpHandler)
      .subscribe(
        () => {},
        (error: any) => {
          expect(error).toBeTruthy();
          expect(error).toBe('Some thing is wrong');
        }
      );

    const httpRequest = httpMock.expectOne('/api/data');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();

    const event = new ErrorEvent('error', {
      error: new Error('request error'),
    });

    httpRequest.error(event);

    tick();

    expect(console.log).toHaveBeenCalledWith('request error');
  }));
});
