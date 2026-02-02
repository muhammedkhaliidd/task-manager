import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  Signal,
} from '@angular/core';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { TASKS_STORE } from '../../../tasks/store/tasks-store';
import { Task } from '../../../tasks/models/tasks.model';
import { TasksCategoryContainer } from '../tasks-category-container/tasks-category-container';
/**
 * Tasks categorized container component
 */
@Component({
  selector: 'app-tasks-categorized-container',
  imports: [CdkDropListGroup, TasksCategoryContainer],
  templateUrl: './tasks-categorized-container.html',
  styleUrl: './tasks-categorized-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCategorizedContainer {
  @Input({ required: true }) nowTimestamp!: number;
  private readonly _tasksStore = inject(TASKS_STORE);
  todoTasks: Signal<Task[]> = this._tasksStore.todoTasks;
  inProgressTasks: Signal<Task[]> = this._tasksStore.inProgressTasks;
  doneTasks: Signal<Task[]> = this._tasksStore.doneTasks;
  tasksLoading: Signal<boolean> = this._tasksStore.tasksLoading;
}
