import { ActivityItem } from '../models/activity.model';

const MAX_ACTIVITIES = 50;

/**
 * Activity state interface
 */
export interface ActivityState {
  activities: ActivityItem[];
  maxActivities: number;
}

/**
 * Initial activity state
 */
export const initialActivityState: ActivityState = {
  activities: [],
  maxActivities: MAX_ACTIVITIES,
};
