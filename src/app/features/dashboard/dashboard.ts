import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardStates } from './components/dashboard-states/dashboard-states';
import { TasksCategorizedContainer } from './components/tasks-categorized-container/tasks-categorized-container';
import { DashboardFilter } from './components/dashboard-filter/dashboard-filter';

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
export class Dashboard {}
