import { inject, Injectable } from '@angular/core';
import { Http } from '../../../core/services/http';
import { APIS } from '../../../constants/apis';
import { catchError, Observable, of, tap } from 'rxjs';
import { TASKS_STORE } from '../store/tasks-store';
import { Task } from '../models/tasks.model';

/**
 * Tasks API service
 */
@Injectable({
  providedIn: 'root',
})
export class TasksApi {
  private readonly _http = inject(Http);
  private readonly _tasksStore = inject(TASKS_STORE);
  /**
   * Get tasks
   *
   * @returns The observable
   */
  getTasks(): Observable<Task[]> {
    this._tasksStore.setTasksLoading(true);
    return this._http.get<Task[]>(APIS.tasks).pipe(
      tap((tasks) => {
        this._tasksStore.setTasks(tasks);
        this._tasksStore.setTasksLoading(false);
      }),
      catchError(() => {
        this._tasksStore.setTasksLoading(false);
        return of([]);
      }),
    );
  }
}
