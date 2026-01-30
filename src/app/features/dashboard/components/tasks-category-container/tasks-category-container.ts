import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { TASKS_STORE } from '../../../tasks/store/tasks-store';
import { Task, TaskState } from '../../../tasks/models/tasks.model';
import { TaskStateNamePipe } from '../../../tasks/pipes/task-state-name-pipe';
import { TaskCard } from '../task-card/task-card';

/**
 * Tasks category container component
 */
@Component({
  selector: 'app-tasks-category-container',
  imports: [CdkDropList, CdkDrag, TaskStateNamePipe, TaskCard],
  templateUrl: './tasks-category-container.html',
  styleUrl: './tasks-category-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCategoryContainer {
  @Input() type!: TaskState;
  @Input() tasks!: Task[];

  private readonly _tasksStore = inject(TASKS_STORE);

  /**
   * Handles drop events when a task is moved; updates task status and order so it appears at the drop index.
   *
   * @param event - The CDK drag-drop event (container data is this column's TaskState, currentIndex is the drop index)
   */
  onDrop(event: CdkDragDrop<TaskState, Task>): void {
    const task = event.item.data as Task;
    const newStatus = event.container.data;
    const targetIndex = event.currentIndex;
    this._tasksStore.moveTaskToStatus(task.id, newStatus, targetIndex);
  }
}
