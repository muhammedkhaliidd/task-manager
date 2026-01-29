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
    value: 'to-do',
  },
  {
    label: 'In Progress',
    value: 'in-progress',
  },
  {
    label: 'Done',
    value: 'done',
  },
];
