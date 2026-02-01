import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DashboardState } from '../dashboard-state/dashboard-state';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';
import { TASKS_STORE } from '../../../tasks/store/tasks-store';
import { StatisticsApiService } from '../../../tasks/services/statistics-api-service';

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

  /** Injected to trigger statistics fetch and sync to store */
  private readonly _statisticsApi = inject(StatisticsApiService);
  protected readonly statistics = this._tasksStore.statistics;
  protected readonly statisticsLoading = this._tasksStore.statisticsLoading;
}
