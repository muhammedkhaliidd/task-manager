import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { DashboardStates } from './components/dashboard-states/dashboard-states';
import { TasksCategorizedContainer } from './components/tasks-categorized-container/tasks-categorized-container';
import { DashboardFilter } from './components/dashboard-filter/dashboard-filter';
import { TasksApi } from '../tasks/services/tasks-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Dashboard component
 */
@Component({
  selector: 'app-dashboard',
  imports: [TasksCategorizedContainer, DashboardFilter, DashboardStates],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {
  private readonly _tasksApi = inject(TasksApi);
  private readonly _destroyRef = inject(DestroyRef);

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {
    this._tasksApi
      .getTasks()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
}
