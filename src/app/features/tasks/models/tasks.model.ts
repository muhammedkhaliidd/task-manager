import { FilterTaskState } from '../../dashboard/models/dashboard-filter.model';

/**
 * Task state type
 */
export type TaskState = 'todo' | 'in_progress' | 'done';

/**
 * Task time state type
 */
export type TaskTimeState = 'overdue' | 'on-going' | 'completed';

/**
 * Task priority type
 */
export type TaskPriority = 'low' | 'medium' | 'high';

/**
 * Task interface
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assignee: Assignee;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  priority: TaskPriority;
  status: TaskState;
}

/**
 * Task statistics interface
 */
export interface TaskStatistic {
  id: string;
  title: string;
  icon: string;
  value: number;
  change: string;
  changeLabel: string;
  changeType: TaskStatisticChangeType;
  color: string;
}

/**
 * Task statistic change type
 */
export type TaskStatisticChangeType = 'positive' | 'negative' | 'neutral';

/**
 * Assignee interface
 */
export interface Assignee {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

/**
 * Task filter interface
 */
export interface TaskFilter {
  state: FilterTaskState;
  priority: TaskPriority[];
  assigneeIds: string[];
  search: string;
}
