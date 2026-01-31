import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '../../../tasks/models/tasks.model';
import { MatCardModule } from '@angular/material/card';
import { UpperCasePipe, NgClass } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { LettersCircleContainerComponent } from '../../../../shared/components/letters-circle-container/letters-circle-container.component';
import { TaskTimePipe } from '../../../tasks/pipes/task-time-pipe';

/**
 * Task card component
 */
@Component({
  selector: 'app-task-card',
  imports: [
    MatCardModule,
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
}
