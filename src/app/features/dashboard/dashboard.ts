import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardStates } from './components/dashboard-states/dashboard-states';
import { TasksCategorizedContainer } from './components/tasks-categorized-container/tasks-categorized-container';
import { DashboardFilter } from './components/dashboard-filter/dashboard-filter';
import { ActivityOverlayService } from '../activity/services/activity-overlay.service';
import { TasksApiService } from '../tasks/services/tasks-api-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

const NOW_INTERVAL = 60 * 1000; // 1 minute

/**
 * Dashboard component
 */
@Component({
  selector: 'app-dashboard',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TasksCategorizedContainer,
    DashboardFilter,
    DashboardStates,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {
  private readonly _tasksApi = inject(TasksApiService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _activityOverlay = inject(ActivityOverlayService);
  protected readonly nowTimestamp = signal(Date.now());

  /**
   * Toggle the Recent Activity overlay visibility.
   */
  protected toggleActivityOverlay(): void {
    this._activityOverlay.toggle();
  }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {
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
}
