import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { TASKS_STORE } from '../../../tasks/store/tasks-store-model';
import { Task } from '../../../tasks/models/tasks.model';

/**
 * Tasks categorized container component
 */
@Component({
  selector: 'app-tasks-categorized-container',
  imports: [],
  templateUrl: './tasks-categorized-container.html',
  styleUrl: './tasks-categorized-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCategorizedContainer {
  private readonly _tasksStore = inject(TASKS_STORE);
  filteredTasks: Signal<Task[]> = this._tasksStore.filteredTasks;
}
