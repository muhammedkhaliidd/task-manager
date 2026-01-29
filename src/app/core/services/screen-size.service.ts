import { inject, Injectable, computed } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

/**
 * Breakpoint names used for responsive layout.
 */
export type BreakpointName = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Service that provides reactive screen size / breakpoint information.
 *
 * Uses Angular CDK BreakpointObserver to detect viewport size and exposes
 * signals for use in components (e.g. to switch sidenav mode and backdrop).
 *
 * Breakpoints (Material):
 * - xsmall: < 600px (handset)
 * - small: 600px - 960px (tablet portrait)
 * - medium: 960px - 1280px (tablet landscape)
 * - large: 1280px - 1920px (desktop)
 * - xlarge: >= 1920px (large desktop)
 */
@Injectable({ providedIn: 'root' })
export class ScreenSizeService {
  private readonly _breakpointObserver = inject(BreakpointObserver);

  private readonly _breakpointMatches = toSignal(
    this._breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        map((result) => {
          const b = result.breakpoints;
          if (b[Breakpoints.XSmall]) return 'xsmall';
          if (b[Breakpoints.Small]) return 'small';
          if (b[Breakpoints.Medium]) return 'medium';
          if (b[Breakpoints.Large]) return 'large';
          if (b[Breakpoints.XLarge]) return 'xlarge';
          return 'medium';
        }),
      ),
    { initialValue: 'medium' as BreakpointName },
  );

  /**
   * Current breakpoint name as a signal.
   */
  readonly breakpoint = computed(() => this._breakpointMatches());

  /**
   * True when viewport is in a mobile-sized breakpoint (xsmall or small).
   * Use this to show over + backdrop for sidenav on mobile.
   */
  readonly isMobile = computed(
    () => this.breakpoint() === 'xsmall' || this.breakpoint() === 'small',
  );

  /**
   * True when viewport is desktop-sized (medium and up).
   */
  readonly isDesktop = computed(() => !this.isMobile());
}
