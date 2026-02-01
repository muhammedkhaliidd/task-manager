import { effect, inject, Injectable } from '@angular/core';
import { APIS } from '../../../constants/apis';
import { TASKS_STORE } from '../store/tasks-store';
import { TaskStatistic } from '../models/tasks.model';
import { httpResource } from '@angular/common/http';

/**
 * Statistics API service - fetches and syncs task statistics to the store.
 * Use this service on the dashboard and analytics page to load statistics.
 */
@Injectable({
  providedIn: 'root',
})
export class StatisticsApiService {
  readonly statisticsResource = httpResource<TaskStatistic[]>(
    () => APIS.statistics,
  );
  private readonly _tasksStore = inject(TASKS_STORE);

  /** Initializes resource sync effect to populate the store */
  constructor() {
    this._syncStatisticsResource();
  }

  /** Sync statistics from httpResource to store */
  private _syncStatisticsResource(): void {
    effect(() => {
      const resource = this.statisticsResource;
      this._tasksStore.setStatisticsLoading(resource.isLoading());
      if (resource.hasValue()) {
        this._tasksStore.setStatistics(resource.value());
      } else if (resource.error()) {
        this._tasksStore.setStatistics([]);
        this._tasksStore.setStatisticsLoading(false);
      }
    });
  }
}
