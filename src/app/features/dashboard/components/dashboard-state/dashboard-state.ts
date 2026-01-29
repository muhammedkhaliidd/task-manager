import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Dashboard state component
 */
@Component({
  selector: 'app-dashboard-state',
  imports: [],
  templateUrl: './dashboard-state.html',
  styleUrl: './dashboard-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardState {}
