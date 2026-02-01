/* eslint-disable @typescript-eslint/naming-convention */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StatisticsApiService } from '../tasks/services/statistics-api-service';
import { TasksApiService } from '../tasks/services/tasks-api-service';
import { TASKS_STORE } from '../tasks/store/tasks-store';
import { TaskPriority, TaskState } from '../tasks/models/tasks.model';

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const PRIORITY_COLORS = ['#22c55e', '#eab308', '#ef4444'];

const STATUS_LABELS: Record<TaskState, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
};

const STATUS_COLORS = ['#94a3b8', '#3b82f6', '#10b981'];

/**
 * Analytics component with task distribution charts
 */
@Component({
  selector: 'app-analytics',
  imports: [BaseChartDirective, MatProgressSpinnerModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Analytics {
  private readonly _statisticsApi = inject(StatisticsApiService);
  private readonly _tasksApi = inject(TasksApiService);
  private readonly _tasksStore = inject(TASKS_STORE);

  protected readonly tasksLoading = this._tasksStore.tasksLoading;

  /** Chart data: tasks by priority */
  protected readonly priorityChartData = computed<
    ChartConfiguration<'doughnut'>['data']
  >(() => {
    const tasks = this._tasksStore.tasks();
    const counts = { low: 0, medium: 0, high: 0 } as Record<
      TaskPriority,
      number
    >;
    for (const task of tasks) {
      counts[task.priority]++;
    }
    return {
      labels: [
        PRIORITY_LABELS.low,
        PRIORITY_LABELS.medium,
        PRIORITY_LABELS.high,
      ],
      datasets: [
        {
          data: [counts.low, counts.medium, counts.high],
          backgroundColor: PRIORITY_COLORS,
          borderWidth: 0,
        },
      ],
    };
  });

  /** Chart data: tasks by status */
  protected readonly statusChartData = computed<
    ChartConfiguration<'doughnut'>['data']
  >(() => {
    const tasks = this._tasksStore.tasks();
    const counts = { todo: 0, in_progress: 0, done: 0 } as Record<
      TaskState,
      number
    >;
    for (const task of tasks) {
      counts[task.status]++;
    }
    return {
      labels: [
        STATUS_LABELS.todo,
        STATUS_LABELS.in_progress,
        STATUS_LABELS.done,
      ],
      datasets: [
        {
          data: [counts.todo, counts.in_progress, counts.done],
          backgroundColor: STATUS_COLORS,
          borderWidth: 0,
        },
      ],
    };
  });

  protected readonly chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
}
