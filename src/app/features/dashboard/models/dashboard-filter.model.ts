import { TaskState } from '../../tasks/models/tasks.model';
import { TaskStateNamePipe } from '../../tasks/pipes/task-state-name-pipe';

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

const taskStateNamePipe = new TaskStateNamePipe();
export const filterTaskStateItems: FilterTaskStateItem[] = [
  {
    label: 'all',
    value: 'all',
  },
  {
    label: taskStateNamePipe.transform('todo'),
    value: 'todo',
  },
  {
    label: taskStateNamePipe.transform('in_progress'),
    value: 'in_progress',
  },
  {
    label: taskStateNamePipe.transform('done'),
    value: 'done',
  },
];
