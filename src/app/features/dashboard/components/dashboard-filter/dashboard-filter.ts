import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  FilterTaskState,
  FilterTaskStateItem,
  filterTaskStateItems,
} from '../../models/dashboard-filter.model';
import { TitleCasePipe } from '@angular/common';
import { TASKS_STORE } from '../../../tasks/store/tasks-store';

/**
 * Dashboard filter component
 */
@Component({
  selector: 'app-dashboard-filter',
  imports: [MatButtonToggleModule, TitleCasePipe],
  templateUrl: './dashboard-filter.html',
  styleUrl: './dashboard-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFilter {
  protected readonly filterTaskStateItems: FilterTaskStateItem[] =
    filterTaskStateItems;
  filterType: FilterTaskState = 'all';
  private readonly _tasksStore = inject(TASKS_STORE);

  /**
   * On filter type change
   *
   * @param event - Filter task state
   */
  onFilterTypeChange(event: FilterTaskState): void {
    const currentFilter = this._tasksStore.filter();
    this._tasksStore.setFilter({ ...currentFilter, state: event });
  }
}
