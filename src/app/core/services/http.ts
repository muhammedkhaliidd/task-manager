import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * HTTP service
 */
@Injectable({
  providedIn: 'root',
})
export class Http {
  private readonly _http = inject(HttpClient);

  /**
   * Get request
   *
   * @param url - The URL to get
   * @returns The observable
   */
  get<T>(url: string): Observable<T> {
    return this._http.get<T>(url);
  }

  /**
   * Post request
   *
   * @param url - The URL to post
   * @param body - The body to post
   * @returns The observable
   */
  post<T>(url: string, body: unknown): Observable<T> {
    return this._http.post<T>(url, body);
  }

  /**
   * Put request
   *
   * @param url - The URL to put
   * @param body - The body to put
   * @returns The observable
   */
  put<T>(url: string, body: unknown): Observable<T> {
    return this._http.put<T>(url, body);
  }
}
