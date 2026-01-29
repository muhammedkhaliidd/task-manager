import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNav } from './core/components/side-nav/side-nav';
import { AppHeader } from './core/components/app-header/app-header';
import { AppFooter } from './core/components/app-footer/app-footer';

/**
 * Root application component
 *
 * This is the main component that bootstraps the Angular application.
 * It serves as the container for the router outlet where all routed
 * components will be rendered. Main content (header, outlet, footer) is
 * projected into app-side-nav, which owns the drawer layout.
 *
 * Uses OnPush change detection strategy for optimal performance.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeader, AppFooter, SideNav],
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
