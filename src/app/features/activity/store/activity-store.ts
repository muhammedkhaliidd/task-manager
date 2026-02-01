import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';
import { initialActivityState } from './activity-store.model';
import { ActivityItem } from '../models/activity.model';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

/**
 * Generates a unique id for an activity item
 *
 * @returns A unique id for an activity item
 */
function generateActivityId(): string {
  return 'act-' + Math.random().toString(36).substring(2, 15);
}

export const ACTIVITY_STORE = signalStore(
  { providedIn: 'root' },
  withDevtools('Activity Store'),
  withState(initialActivityState),
  withMethods((store) => ({
    /**
     * Add an activity item. Keeps only the most recent maxActivities items.
     *
     * @param activity - The activity to add (without id)
     */
    addActivity: (activity: Omit<ActivityItem, 'id'>) => {
      const item: ActivityItem = {
        ...activity,
        id: generateActivityId(),
      };
      const current = store.activities();
      const updated = [item, ...current].slice(0, store.maxActivities());
      patchState(store, { activities: updated });
    },
  })),
);
