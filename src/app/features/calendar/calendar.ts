import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Calendar component
 */
@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calendar {}
