import { Pipe, PipeTransform } from '@angular/core';

/**
 * Task time interface
 */
interface TaskTime {
  timeString: string;
  icon: string;
  borderClass: string;
  backgroundClass: string;
}

/**
 * Pipe to transform task time to a readable name
 */
@Pipe({
  name: 'taskTime',
})
export class TaskTimePipe implements PipeTransform {
  /**
   * Transforms the task time to a readable name
   *
   * @param value - The task due date
   * @param nowTimestamp - The current timestamp
   * @returns The readable name of the task time
   */
  transform(value: string, nowTimestamp: number): TaskTime {
    const taskTime: TaskTime = {
      timeString: value || '',
      icon: '📅',
      borderClass: 'tansparent',
      backgroundClass: '!bg-white',
    };

    if (value && nowTimestamp) {
      const taskTimestamp = new Date(value).getTime();
      const timeDiff = taskTimestamp - nowTimestamp;
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesDiff = Math.floor(timeDiff / (1000 * 60));
      const secondsDiff = Math.floor(timeDiff / 1000);

      if (daysDiff > 0) {
        taskTime.timeString = `Due in ${daysDiff} days`;
      } else if (hoursDiff > 0) {
        taskTime.timeString = `Due in ${hoursDiff} hours`;
      } else if (minutesDiff > 0) {
        taskTime.timeString = `Due in ${minutesDiff} minutes`;
      } else if (secondsDiff > 0) {
        taskTime.timeString = `Due in ${secondsDiff} seconds`;
      }

      // if the task is overdue
      if (timeDiff < 0) {
        taskTime.timeString = `Overdue by ${Math.abs(daysDiff)} days`;
        taskTime.icon = '⚠';
        taskTime.borderClass = 'red';
        taskTime.backgroundClass = 'bg-lavender-blush';
      }
    }

    return taskTime;
  }
}
