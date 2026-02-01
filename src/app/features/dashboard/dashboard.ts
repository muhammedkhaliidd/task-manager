import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DashboardStates } from './components/dashboard-states/dashboard-states';
import { TasksCategorizedContainer } from './components/tasks-categorized-container/tasks-categorized-container';
import { DashboardFilter } from './components/dashboard-filter/dashboard-filter';
import { TasksApiService } from '../tasks/services/tasks-api-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

const NOW_INTERVAL = 1000;

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
  private readonly _tasksApi = inject(TasksApiService);
  private readonly _destroyRef = inject(DestroyRef);
  protected readonly nowTimestamp = signal(Date.now());

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {
    this.getTasks();
    this.getStatistics();
    this.handleNowInterval();
  }

  /**
   * Handle now interval
   */
  handleNowInterval(): void {
    interval(NOW_INTERVAL)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.nowTimestamp.set(Date.now());
      });
  }

  /**
   * Get tasks
   */
  getTasks(): void {
    this._tasksApi
      .getTasks()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  /**
   * Get statistics
   */
  getStatistics(): void {
    this._tasksApi
      .getTaskStatistics()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
}
