import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * App header component selector used in the application.
 */
@Component({
  selector: 'app-app-header',
  imports: [],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {}
