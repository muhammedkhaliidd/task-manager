import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskStatistic } from '../../../tasks/models/tasks.model';
import { NgClass } from '@angular/common';

/**
 * Dashboard state component
 */
@Component({
  selector: 'app-dashboard-state',
  imports: [NgClass],
  templateUrl: './dashboard-state.html',
  styleUrl: './dashboard-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardState {
  @Input({ required: true }) statistic!: TaskStatistic;
}
