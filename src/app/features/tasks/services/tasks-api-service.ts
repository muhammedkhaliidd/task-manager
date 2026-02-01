import { inject, Injectable } from '@angular/core';
import { Http } from '../../../core/services/http';
import { APIS } from '../../../constants/apis';
import { catchError, delay, Observable, of, tap, throwError } from 'rxjs';
import { TASKS_STORE } from '../store/tasks-store';
import { Task, TaskStatistic } from '../models/tasks.model';

/**
 * Tasks API service
 */
@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
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

  /**
   * Get task statistics
   *
   * @returns The observable of the task statistics
   */
  getTaskStatistics(): Observable<TaskStatistic[]> {
    this._tasksStore.setStatisticsLoading(true);
    return this._http.get<TaskStatistic[]>(APIS.statistics).pipe(
      delay(3000),
      tap((statistics) => {
        this._tasksStore.setStatistics(statistics);
        this._tasksStore.setStatisticsLoading(false);
      }),
      catchError(() => {
        this._tasksStore.setStatisticsLoading(false);
        return of([]);
      }),
    );
  }
}
