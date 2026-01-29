import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Tasks component
 */
@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tasks {}
