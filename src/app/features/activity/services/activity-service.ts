/* eslint-disable @typescript-eslint/naming-convention */
import { inject, Injectable } from '@angular/core';
import { ACTIVITY_STORE } from '../store/activity-store';
import { TaskState } from '../../tasks/models/tasks.model';

const STATUS_LABELS: Record<TaskState, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
};

/**
 * Service to record task activity for the Recent Activity Feed.
 */
@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly _store = inject(ACTIVITY_STORE);

  /**
   * Record that a task was created
   *
   * @param taskId - Task id
   * @param taskTitle - Task title
   * @param assigneeName - Assignee name
   * @param assigneeId - Assignee id
   */
  recordCreated(
    taskId: string,
    taskTitle: string,
    assigneeName: string,
    assigneeId: string,
  ): void {
    this._store.addActivity({
      taskId,
      taskTitle,
      action: 'created',
      assigneeName,
      assigneeId,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Record that a task was updated
   *
   * @param taskId - Task id
   * @param taskTitle - Task title
   * @param assigneeName - Assignee name
   * @param assigneeId - Assignee id
   */
  recordUpdated(
    taskId: string,
    taskTitle: string,
    assigneeName: string,
    assigneeId: string,
  ): void {
    this._store.addActivity({
      taskId,
      taskTitle,
      action: 'updated',
      assigneeName,
      assigneeId,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Record that a task status was changed (e.g. via drag-drop)
   *
   * @param taskId - Task id
   * @param taskTitle - Task title
   * @param assigneeName - Assignee name
   * @param assigneeId - Assignee id
   * @param newStatus - New status
   */
  recordStatusChanged(
    taskId: string,
    taskTitle: string,
    assigneeName: string,
    assigneeId: string,
    newStatus: TaskState,
  ): void {
    this._store.addActivity({
      taskId,
      taskTitle,
      action: 'status_changed',
      assigneeName,
      assigneeId,
      timestamp: new Date().toISOString(),
      details: STATUS_LABELS[newStatus],
    });
  }

  /**
   * Record that a task was deleted
   *
   * @param taskId - Task id
   * @param taskTitle - Task title
   * @param assigneeName - Assignee name (who deleted / was assignee)
   * @param assigneeId - Assignee id
   */
  recordDeleted(
    taskId: string,
    taskTitle: string,
    assigneeName: string,
    assigneeId: string,
  ): void {
    this._store.addActivity({
      taskId,
      taskTitle,
      action: 'deleted',
      assigneeName,
      assigneeId,
      timestamp: new Date().toISOString(),
    });
  }
}
