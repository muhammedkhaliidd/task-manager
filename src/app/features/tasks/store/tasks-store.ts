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
  TaskStatistics,
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
    updateTaskStatus: (taskId: string, status: TaskState) => {
      const updated = tasksStore
        .tasks()
        .map((t) => (t.id === taskId ? { ...t, status } : t));
      patchState(tasksStore, { tasks: updated });
    },
    /**
     * Moves a task to a status and inserts it at the given index within that column.
     *
     * @param taskId - Id of the task to move
     * @param newStatus - Target column status (todo | in_progress | done)
     * @param targetIndex - Index in the target column where the task should appear (0-based)
     */
    moveTaskToStatus: (
      taskId: string,
      newStatus: TaskState,
      targetIndex: number,
    ) => {
      const tasks = tasksStore.tasks();
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;
      const updatedTask = { ...task, status: newStatus };
      const otherTasks = tasks.filter((t) => t.id !== taskId);
      const indicesWithNewStatus = otherTasks
        .map((t, i) => (t.status === newStatus ? i : -1))
        .filter((i) => i >= 0);
      const insertIndex =
        indicesWithNewStatus[targetIndex] ?? otherTasks.length;
      const newTasks = [
        ...otherTasks.slice(0, insertIndex),
        updatedTask,
        ...otherTasks.slice(insertIndex),
      ];
      patchState(tasksStore, { tasks: newTasks });
    },
  })),
);

const filterTasks = (tasks: Task[], filter: TaskFilter): Task[] => {
  const { state, priority, search } = filter;
  return tasks.filter((task) => {
    const stateMatch = !state || state === 'all' || task.status === state;
    const priorityMatch = !priority.length || priority.includes(task.priority);
    const searchMatch =
      !search || task.title.toLowerCase().includes(search.toLowerCase());
    return stateMatch && priorityMatch && searchMatch;
  });
};

const categorizeTasks = (tasks: Task[], category: TaskState): Task[] => {
  return tasks.filter((task) => task.status === category);
};
