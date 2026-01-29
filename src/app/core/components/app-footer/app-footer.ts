import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Application footer component displayed at the bottom of the main content.
 */
@Component({
  selector: 'app-app-footer',
  imports: [],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooter {}
