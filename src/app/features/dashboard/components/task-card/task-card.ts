import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Task } from '../../../tasks/models/tasks.model';
import { MatCardModule } from '@angular/material/card';
import { UpperCasePipe, NgClass } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { CustomButton } from '../../../../shared/components/custom-button/custom-button';
import { LettersCircleContainerComponent } from '../../../../shared/components/letters-circle-container/letters-circle-container.component';
import { TaskTimePipe } from '../../../tasks/pipes/task-time-pipe';
import { TasksService } from '../../../tasks/services/tasks-service';

/**
 * Task card component
 */
@Component({
  selector: 'app-task-card',
  imports: [
    MatCardModule,
    CustomButton,
    UpperCasePipe,
    NgClass,
    MatDividerModule,
    LettersCircleContainerComponent,
    TaskTimePipe,
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCard {
  @Input({ required: true }) task!: Task;
  @Input({ required: true }) nowTimestamp!: number;

  private readonly _tasksService = inject(TasksService);

  /**
   * Delete the task
   */
  onDelete(): void {
    this._tasksService.deleteTask(this.task);
  }
}
