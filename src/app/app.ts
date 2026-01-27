import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root application component
 *
 * This is the main component that bootstraps the Angular application.
 * It serves as the container for the router outlet where all routed
 * components will be rendered.
 *
 * Uses OnPush change detection strategy for optimal performance.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  /**
   * Application title displayed in the UI
   */
  protected title = 'task-manager';
}
