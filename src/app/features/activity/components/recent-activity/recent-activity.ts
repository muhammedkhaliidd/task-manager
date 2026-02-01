/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgClass, DatePipe } from '@angular/common';
import { ACTIVITY_STORE } from '../../store/activity-store';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time.pipe';
import { ActivityAction, ActivityItem } from '../../models/activity.model';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Recent activity feed component
 */
@Component({
  selector: 'app-recent-activity',
  imports: [NgClass, DatePipe, RelativeTimePipe, MatDividerModule],
  templateUrl: './recent-activity.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentActivity {
  private readonly _store = inject(ACTIVITY_STORE);

  protected readonly activities = this._store.activities;

  /**
   * Get icon for activity action
   *
   * @param action - The activity action
   * @returns The icon for the activity action
   */
  protected getIcon(action: ActivityAction): string {
    const icons: Record<ActivityAction, string> = {
      created: '＋',
      updated: '✎',
      status_changed: '→',
      deleted: '×',
    };
    return icons[action] ?? '•';
  }

  /**
   * Get CSS class for activity icon background
   *
   * @param action - The activity action
   * @returns The CSS class for the activity icon background
   */
  protected getIconClass(action: ActivityAction): string {
    const classes: Record<ActivityAction, string> = {
      created: 'bg-emerald-100 text-emerald-700',
      updated: 'bg-blue-100 text-blue-700',
      status_changed: 'bg-amber-100 text-amber-700',
      deleted: 'bg-red-100 text-red-700',
    };
    return classes[action] ?? 'bg-slate-100 text-slate-600';
  }

  /**
   * Get action text for activity
   *
   * @param activity - The activity item
   * @returns The action text for the activity
   */
  protected getActionText(activity: ActivityItem): string {
    switch (activity.action) {
      case 'created':
        return 'was created by';
      case 'updated':
        return 'was updated by';
      case 'status_changed':
        return 'status changed to ' + (activity.details ?? '') + ' by';
      case 'deleted':
        return 'was deleted by';
      default:
        return 'by';
    }
  }
}
