import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StatisticsApiService } from '../tasks/services/statistics-api-service';

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
export class Analytics {
  /** Injected to trigger statistics fetch and sync to store when visiting analytics */
  private readonly _statisticsApi = inject(StatisticsApiService);
}
