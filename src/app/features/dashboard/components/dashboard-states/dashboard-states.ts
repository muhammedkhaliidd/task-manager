import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DashboardState } from '../dashboard-state/dashboard-state';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';
import { TASKS_STORE } from '../../../tasks/store/tasks-store';

/**
 * Dashboard states component
 */
@Component({
  selector: 'app-dashboard-states',
  imports: [DashboardState, Skeleton],
  templateUrl: './dashboard-states.html',
  styleUrl: './dashboard-states.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStates {
  private readonly _tasksStore = inject(TASKS_STORE);
  protected readonly statistics = this._tasksStore.statistics;
  protected readonly statisticsLoading = this._tasksStore.statisticsLoading;
}
