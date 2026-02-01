import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Task, TaskState } from '../../../tasks/models/tasks.model';
import { TaskStateNamePipe } from '../../../tasks/pipes/task-state-name-pipe';
import { TaskCard } from '../task-card/task-card';
import { MatDividerModule } from '@angular/material/divider';
import { UpperCasePipe } from '@angular/common';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';
import { TasksService } from '../../../tasks/services/tasks-service';

/**
 * Tasks category container component
 */
@Component({
  selector: 'app-tasks-category-container',
  imports: [
    CdkDropList,
    CdkDrag,
    TaskStateNamePipe,
    TaskCard,
    MatDividerModule,
    UpperCasePipe,
    Skeleton,
  ],
  templateUrl: './tasks-category-container.html',
  styleUrl: './tasks-category-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCategoryContainer {
  @Input({ required: true }) type!: TaskState;
  @Input({ required: true }) tasks!: Task[];
  @Input({ required: true }) nowTimestamp!: number;
  @Input() isLoading: boolean = false;
  private readonly _tasksService = inject(TasksService);
  /**
   * Handles drop events when a task is moved between columns.
   * Ignores drops within the same column (tasks are ordered by date).
   *
   * @param event - The CDK drag-drop event
   */
  onDrop(event: CdkDragDrop<TaskState, Task>): void {
    const task = event.item.data as Task;
    const newStatus = event.container.data as TaskState;
    if (task.status === newStatus) {
      return; /* Same column – no reorder, ordered by date */
    }
    const targetIndex = event.currentIndex;
    const originalIndex = event.previousIndex;
    this._tasksService.moveTaskToStatus(
      task.id,
      newStatus,
      targetIndex,
      originalIndex,
    );
  }
}
