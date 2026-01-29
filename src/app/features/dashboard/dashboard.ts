import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Dashboard component
 */
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {}
