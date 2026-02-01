/**
 * Activity action type
 */
export type ActivityAction =
  | 'created'
  | 'updated'
  | 'status_changed'
  | 'deleted';

/**
 * Activity item interface
 */
export interface ActivityItem {
  id: string;
  taskId: string;
  taskTitle: string;
  action: ActivityAction;
  assigneeName: string;
  assigneeId: string;
  timestamp: string;
  /** Optional details e.g. "todo → in_progress" for status_changed */
  details?: string;
}
