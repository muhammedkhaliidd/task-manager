import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  FilterTaskStateItem,
  filterTaskStateItems,
} from '../../models/dashboard-filter.model';

/**
 * Dashboard filter component
 */
@Component({
  selector: 'app-dashboard-filter',
  imports: [MatButtonToggleModule],
  templateUrl: './dashboard-filter.html',
  styleUrl: './dashboard-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFilter {
  protected readonly filterTaskStateItems: FilterTaskStateItem[] =
    filterTaskStateItems;
}
