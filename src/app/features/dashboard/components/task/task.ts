import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Task component
 */
@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Task {}
