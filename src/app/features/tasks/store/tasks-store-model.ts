import {
  signalStore,
  withComputed,
  withMethods,
  withState,
  patchState,
} from '@ngrx/signals';
import { initialTasksState } from './tasks-store';
import { Task, TaskFilter, TaskStatistics } from '../models/tasks.model';
import { computed } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const TASKS_STORE = signalStore(
  { providedIn: 'root' },
  withDevtools('Tasks Store'),
  withState(initialTasksState),
  withComputed((tasksStore) => ({
    filteredTasks: computed(() => {
      return tasksStore.tasks();
    }),
  })),
  withMethods((tasksStore) => ({
    setTasks: (tasks: Task[]) => {
      patchState(tasksStore, { tasks });
    },
    setStatistics: (statistics: TaskStatistics) => {
      patchState(tasksStore, { statistics });
    },
    setFilter: (filter: TaskFilter) => {
      patchState(tasksStore, { filter });
    },
    setTasksLoading: (tasksLoading: boolean) => {
      patchState(tasksStore, { tasksLoading });
    },
    setStatisticsLoading: (statisticsLoading: boolean) => {
      patchState(tasksStore, { statisticsLoading });
    },
  })),
);
