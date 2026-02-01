import { inject, Injectable } from '@angular/core';
import { Task, TaskState } from '../models/tasks.model';
import { DialogService } from '../../../shared/services/dialog-service';
import { TaskForm } from '../components/task-form/task-form';
import { TASKS_STORE } from '../store/tasks-store';
import { catchError, filter, switchMap, take, throwError } from 'rxjs';
import { TasksApiService } from './tasks-api-service';
import { ToastService } from '../../../shared/services/toast-service';
import { InteractionsService } from '../../../shared/services/interactions-service';

/**
 * Tasks service
 */
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly _dialogService = inject(DialogService);
  private readonly _tasksStore = inject(TASKS_STORE);
  private readonly _tasksApi = inject(TasksApiService);
  private readonly _toastService = inject(ToastService);
  private readonly _interactions = inject(InteractionsService);

  /**
   * Delete a task with confirmation.
   *
   * @param task - The task to delete
   */
  deleteTask(task: Task): void {
    this._interactions
      .showConfirmation({
        title: 'Delete Task',
        message: `Are you sure you want to delete "${task.title}"?`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        confirmColor: 'warn',
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this._tasksApi.deleteTask(task.id)),
        take(1),
      )
      .subscribe({
        next: () => {
          this._toastService.showToast(
            'Task deleted successfully',
            3000,
            'default',
          );
        },
        error: () => {
          this._toastService.showToast('Failed to delete task', 4000, 'error');
        },
      });
  }

  /**
   * Open the task form modal
   *
   * @param task - The task to open the form modal for
   */
  openTaskFormModal(task?: Task): void {
    this._dialogService.openDialog(TaskForm, {
      width: '500px',
      height: '500px',
      data: task,
      autoFocus: false,
    });
  }

  /**
   * Move a task to a status and insert it at the given index within that column.
   *
   * @param taskId - Id of the task to move
   * @param newStatus - Target column status (todo | in_progress | done)
   * @param targetIndex - Index in the target column where the task should appear (0-based)
   * @param originalIndex - The original index
   */
  moveTaskToStatus(
    taskId: string,
    newStatus: TaskState,
    targetIndex: number,
    originalIndex: number,
  ): void {
    const tasks = this._tasksStore.tasks();
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const updatedTask = { ...task, status: newStatus };
    const otherTasks = tasks.filter((t) => t.id !== taskId);
    const indicesWithNewStatus = otherTasks
      .map((t, i) => (t.status === newStatus ? i : -1))
      .filter((i) => i >= 0);
    const insertIndex = indicesWithNewStatus[targetIndex] ?? otherTasks.length;
    const newTasks = [
      ...otherTasks.slice(0, insertIndex),
      updatedTask,
      ...otherTasks.slice(insertIndex),
    ];
    this._tasksStore.setTasks(newTasks);
    this._tasksApi
      .replaceTask(taskId, updatedTask)
      .pipe(
        take(1),
        catchError(() => {
          this.handleDragDropError(updatedTask, originalIndex);
          return throwError(() => new Error('Failed to replace task'));
        }),
      )
      .subscribe();
  }

  /**
   * Handle drag drop error, revert the task to its original position
   *
   * @param updatedTask - The updated task
   * @param originalIndex - The original index
   */
  handleDragDropError(updatedTask: Task, originalIndex: number): void {
    const tasks = this._tasksStore.tasks();
    const newTasks = [
      ...tasks.slice(0, originalIndex),
      updatedTask,
      ...tasks.slice(originalIndex + 1),
    ];
    this._toastService.showToast('Failed to replace task', 4000, 'error');
    this._tasksStore.setTasks(newTasks);
  }
}
