import {
  signalStore,
  withComputed,
  withMethods,
  withState,
  patchState,
} from '@ngrx/signals';
import { initialTasksState } from './tasks-store.model';
import {
  Task,
  TaskFilter,
  TaskState,
  TaskStatistic,
} from '../models/tasks.model';
import { computed } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const TASKS_STORE = signalStore(
  { providedIn: 'root' },
  withDevtools('Tasks Store'),
  withState(initialTasksState),
  withComputed((tasksStore) => {
    const filteredTasks = computed(() =>
      filterTasks(tasksStore.tasks(), tasksStore.filter()),
    );
    return {
      filteredTasks,
      todoTasks: computed(() => categorizeTasks(filteredTasks(), 'todo')),
      inProgressTasks: computed(() =>
        categorizeTasks(filteredTasks(), 'in_progress'),
      ),
      doneTasks: computed(() => categorizeTasks(filteredTasks(), 'done')),
    };
  }),
  withMethods((tasksStore) => ({
    setTasks: (tasks: Task[]) => {
      patchState(tasksStore, { tasks });
    },
    setStatistics: (statistics: TaskStatistic[]) => {
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
    updateTaskStatus: (taskId: string, status: TaskState) => {
      const updated = tasksStore
        .tasks()
        .map((t) => (t.id === taskId ? { ...t, status } : t));
      patchState(tasksStore, { tasks: updated });
    },
    addTask: (task: Task) => {
      patchState(tasksStore, { tasks: [...tasksStore.tasks(), task] });
    },
    updateTask: (task: Task) => {
      const updated = tasksStore
        .tasks()
        .map((t) => (t.id === task.id ? task : t));
      patchState(tasksStore, { tasks: updated });
    },
  })),
);

const filterTasks = (tasks: Task[], filter: TaskFilter): Task[] => {
  const { state, priority, assigneeIds, search } = filter;
  return tasks.filter((task) => {
    const stateMatch = !state || state === 'all' || task.status === state;
    const priorityMatch = !priority.length || priority.includes(task.priority);
    const assigneeMatch =
      !assigneeIds.length || assigneeIds.includes(task.assignee.id);
    const searchMatch =
      !search ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    return stateMatch && priorityMatch && assigneeMatch && searchMatch;
  });
};

/**
 * Categorize tasks by status and sort by due date
 *
 * @param tasks - The tasks to categorize
 * @param category - The category to categorize the tasks by
 * @returns The categorized tasks
 */
const categorizeTasks = (tasks: Task[], category: TaskState): Task[] => {
  return tasks
    .filter((task) => task.status === category)
    .sort((a, b) => {
      const aDueDate = new Date(a.dueDate).getTime();
      const bDueDate = new Date(b.dueDate).getTime();
      return aDueDate - bDueDate;
    });
};
