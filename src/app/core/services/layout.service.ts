import { Injectable, signal } from '@angular/core';

/**
 * Service that controls the global layout drawer (sidenav) open state.
 *
 * Used by the root layout to bind mat-drawer [opened] and (openedChange),
 * and by the header burger button to toggle the drawer.
 */
@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly _drawerOpened = signal(false);

  /**
   * Current drawer open state. Read-only signal.
   */
  readonly drawerOpened = this._drawerOpened.asReadonly();

  /**
   * Opens the drawer.
   */
  openDrawer(): void {
    this._drawerOpened.set(true);
  }

  /**
   * Closes the drawer.
   */
  closeDrawer(): void {
    this._drawerOpened.set(false);
  }

  /**
   * Toggles the drawer open state.
   */
  toggleDrawer(): void {
    this._drawerOpened.update((v) => !v);
  }

  /**
   * Sets the drawer open state (e.g. from mat-drawer openedChange).
   *
   * @param opened - New open state
   */
  setDrawerOpened(opened: boolean): void {
    this._drawerOpened.set(opened);
  }
}
