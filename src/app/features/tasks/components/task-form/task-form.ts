import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Task form component
 */
@Component({
  selector: 'app-task-form',
  imports: [],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskForm {}
