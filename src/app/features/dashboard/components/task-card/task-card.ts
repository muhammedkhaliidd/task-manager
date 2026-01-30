import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '../../../tasks/models/tasks.model';
import { MatCardModule } from '@angular/material/card';

/**
 * Task card component
 */
@Component({
  selector: 'app-task-card',
  imports: [MatCardModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCard {
  @Input() task!: Task;
}
