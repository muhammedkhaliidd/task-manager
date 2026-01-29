import { TaskState } from '../../tasks/models/tasks.model';

/**
 * Filter task state type
 */
export type FilterTaskState = 'all' | TaskState;

/**
 * Filter task state item type
 */
export interface FilterTaskStateItem {
  label: string;
  value: FilterTaskState;
}

export const filterTaskStateItems: FilterTaskStateItem[] = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'To Do',
    value: 'todo',
  },
  {
    label: 'In Progress',
    value: 'in_progress',
  },
  {
    label: 'Done',
    value: 'done',
  },
];
