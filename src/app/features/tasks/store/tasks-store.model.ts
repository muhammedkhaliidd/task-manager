import { Task, TaskFilter, TaskStatistics } from '../models/tasks.model';

/**
 * Tasks state interface
 */
export interface TasksState {
  tasks: Task[];
  statistics: TaskStatistics;
  filter: TaskFilter;
  tasksLoading: boolean;
  statisticsLoading: boolean;
}

/**
 * Initial tasks state
 */
export const initialTasksState: TasksState = {
  tasks: [],
  statistics: {
    totalTasks: 0,
  },
  filter: {
    state: 'all',
    priority: [],
    search: '',
  },
  tasksLoading: false,
  statisticsLoading: false,
};
