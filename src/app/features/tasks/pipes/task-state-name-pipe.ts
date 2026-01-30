import { Pipe, PipeTransform } from '@angular/core';
import { TaskState } from '../models/tasks.model';

/**
 * Pipe to transform task state to a readable name
 */
@Pipe({
  name: 'taskStatusName',
})
export class TaskStateNamePipe implements PipeTransform {
  /**
   * Transforms the task state to a readable name
   *
   * @param value - The task state
   * @returns The readable name of the task state
   */
  transform(value: TaskState): string {
    switch (value) {
      case 'todo':
        return 'to do';
      case 'in_progress':
        return 'in progress';
      case 'done':
        return 'done';
      default:
        return value;
    }
  }
}
