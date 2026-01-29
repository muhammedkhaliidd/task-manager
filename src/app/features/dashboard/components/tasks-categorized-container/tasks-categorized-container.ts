import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Tasks categorized container component
 */
@Component({
  selector: 'app-tasks-categorized-container',
  imports: [],
  templateUrl: './tasks-categorized-container.html',
  styleUrl: './tasks-categorized-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCategorizedContainer {}
