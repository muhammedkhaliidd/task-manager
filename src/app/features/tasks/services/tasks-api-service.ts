import { effect, inject, Injectable } from '@angular/core';
import { Http } from '../../../core/services/http';
import { APIS } from '../../../constants/apis';
import { catchError, delay, Observable, of, tap, throwError } from 'rxjs';
import { TASKS_STORE } from '../store/tasks-store';
import { Task } from '../models/tasks.model';
import { httpResource } from '@angular/common/http';

/**
 * Tasks API service
 */
@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  readonly tasksResource = httpResource<Task[]>(() => APIS.tasks);
  private readonly _http = inject(Http);
  private readonly _tasksStore = inject(TASKS_STORE);

  /** Initializes resource sync effect to populate the store */
  constructor() {
    this._syncTasksResource();
  }

  /** Sync tasks from httpResource to store */
  private _syncTasksResource(): void {
    effect(() => {
      const resource = this.tasksResource;
      this._tasksStore.setTasksLoading(resource.isLoading());
      if (resource.hasValue()) {
        this._tasksStore.setTasks(resource.value());
      } else if (resource.error()) {
        this._tasksStore.setTasks([]);
        this._tasksStore.setTasksLoading(false);
      }
    });
  }

  /**
   * Get tasks
   *
   * @returns The observable
   */
  getTasks(): Observable<Task[]> {
    this._tasksStore.setTasksLoading(true);
    return this._http.get<Task[]>(APIS.tasks).pipe(
      delay(1500),
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

  /**
   * Replace a task
   *
   * @param taskId - Id of the task to replace
   * @param updatedTask - The updated task
   * @returns The observable
   */
  replaceTask(taskId: string, updatedTask: Task): Observable<Task> {
    return this._http.put<Task>(APIS.tasks + '/' + taskId, updatedTask).pipe(
      catchError(() => {
        return throwError(() => new Error('Failed to replace task'));
      }),
    );
  }

  /**
   * Delete a task
   *
   * @param taskId - Id of the task to delete
   * @returns The observable
   */
  deleteTask(taskId: string): Observable<void> {
    return this._http.delete<void>(APIS.tasks + '/' + taskId).pipe(
      tap(() => {
        const tasks = this._tasksStore.tasks().filter((t) => t.id !== taskId);
        this._tasksStore.setTasks(tasks);
      }),
      catchError(() => {
        return throwError(() => new Error('Failed to delete task'));
      }),
    );
  }

  /**
   * Create a new task
   *
   * @param task - The task data for creation (id, createdAt, updatedAt are added by the server)
   * @returns The observable of the created task
   */
  createTask(task: Task): Observable<Task> {
    return this._http.post<Task>(APIS.tasks, task).pipe(
      catchError(() => {
        return throwError(() => new Error('Failed to create task'));
      }),
    );
  }
}
