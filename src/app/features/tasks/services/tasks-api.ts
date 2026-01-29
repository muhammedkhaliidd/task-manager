import { inject, Injectable } from '@angular/core';
import { Http } from '../../../core/services/http';

/**
 * Tasks API service
 */
@Injectable({
  providedIn: 'root',
})
export class TasksApi {
  private readonly _http = inject(Http);

  /**
   * Get tasks
   *
   * @returns The observable
   */
  // getTasks(): Observable<Task[]> {
  //   return this._http.get<Task[]>('https://api.example.com/tasks');
  // }
}
