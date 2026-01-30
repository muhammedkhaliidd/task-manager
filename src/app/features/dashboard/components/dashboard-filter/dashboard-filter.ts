import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  FilterTaskStateItem,
  filterTaskStateItems,
} from '../../models/dashboard-filter.model';
import { TitleCasePipe } from '@angular/common';

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
}
