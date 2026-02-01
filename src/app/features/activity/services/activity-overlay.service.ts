import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/**
 * Service to control the Recent Activity overlay visibility.
 * Used to render the overlay at app level (outside side-nav) so it stacks above the drawer.
 */
@Injectable({
  providedIn: 'root',
})
export class ActivityOverlayService {
  private readonly _router = inject(Router);

  readonly isOpen = signal(false);

  /**
   * Constructor
   */
  constructor() {
    this._router.events
      .pipe(
        filter((e: unknown): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event: NavigationEnd) => {
        if (!event.urlAfterRedirects.includes('/dashboard')) {
          this.close();
        }
      });
  }

  /**
   * Toggles the activity overlay visibility
   */
  toggle(): void {
    this.isOpen.update((v) => !v);
  }

  /**
   * Opens the activity overlay
   */
  open(): void {
    this.isOpen.set(true);
  }

  /**
   * Closes the activity overlay
   */
  close(): void {
    this.isOpen.set(false);
  }
}
