import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { cacheInterceptor } from './cache.interceptor';

describe('cacheInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([cacheInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should return cached response for duplicate GET requests', () => {
    const url = '/api/data';
    http.get(url).subscribe();
    const req = controller.expectOne(url);
    req.flush({ value: 1 });

    http.get(url).subscribe((data) => {
      expect(data).toEqual({ value: 1 });
    });
    controller.expectNone(url);
  });

  it('should not cache non-GET requests', () => {
    const url = '/api/data';
    http.post(url, {}).subscribe();
    controller.expectOne(url).flush({});
    http.post(url, {}).subscribe();
    controller.expectOne(url).flush({});
  });
});
