import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Analytics component
 */
@Component({
  selector: 'app-analytics',
  imports: [],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Analytics {}
