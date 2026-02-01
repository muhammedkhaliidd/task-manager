import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { retryInterceptor } from './retry.interceptor';

describe('retryInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([retryInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should pass through successful requests', () => {
    const url = '/api/data';
    http.get(url).subscribe((data) => {
      expect(data).toEqual({ value: 1 });
    });
    controller.expectOne(url).flush({ value: 1 });
  });

  it('should retry on 5xx error', (done) => {
    const url = '/api/data';
    let attempts = 0;
    http.get(url).subscribe({
      next: (data) => {
        expect(data).toEqual({ value: 1 });
        expect(attempts).toBe(2);
        done();
      },
      error: done.fail,
    });
    const req1 = controller.expectOne(url);
    req1.flush('Error', { status: 500, statusText: 'Server Error' });
    attempts++;
    const req2 = controller.expectOne(url);
    req2.flush({ value: 1 });
    attempts++;
  });
});
