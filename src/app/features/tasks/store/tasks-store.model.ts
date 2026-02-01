import { Task, TaskFilter, TaskStatistic } from '../models/tasks.model';

/**
 * Tasks state interface
 */
export interface TasksState {
  tasks: Task[];
  statistics: TaskStatistic[];
  filter: TaskFilter;
  tasksLoading: boolean;
  statisticsLoading: boolean;
}

/**
 * Initial tasks state
 */
export const initialTasksState: TasksState = {
  tasks: [],
  statistics: [],
  filter: {
    state: 'all',
    priority: [],
    search: '',
  },
  tasksLoading: false,
  statisticsLoading: false,
};
