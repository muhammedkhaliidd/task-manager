import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { ScreenSizeService } from '../../services/screen-size.service';

/**
 * Interface for navigation items.
 */
interface NavItem {
  id: string;
  label: string;
  icon: string;
  routerLink?: string;
}

/**
 * Side navigation component that owns the full drawer layout.
 *
 * Renders a Material drawer container with:
 * - A drawer containing the nav list (Home, Settings, etc.)
 * - Drawer content slot (ng-content) for the main app content (header, router-outlet, footer).
 *
 * Drawer mode and backdrop are responsive: over + backdrop on mobile, side on desktop.
 * Drawer is open by default on desktop and closed on mobile; syncs with viewport on resize.
 */
@Component({
  selector: 'app-side-nav',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNav {
  private readonly _layoutService = inject(LayoutService);
  private readonly _screenSize = inject(ScreenSizeService);

  /**
   * Keeps drawer open on desktop and closed on mobile (initial load and on viewport resize).
   */
  private readonly _syncDrawerToViewport = effect(
    () => {
      this._layoutService.setDrawerOpened(this._screenSize.isDesktop());
    },
    { allowSignalWrites: true },
  );

  /**
   * Sidenav mode: 'over' on mobile, 'side' on desktop.
   */
  protected readonly drawerMode = computed(() =>
    this._screenSize.isMobile() ? 'over' : 'side',
  );

  /**
   * Whether the drawer shows a backdrop: true on mobile, false on desktop.
   */
  protected readonly drawerHasBackdrop = computed(() =>
    this._screenSize.isMobile(),
  );

  protected readonly drawerOpened = this._layoutService.drawerOpened;

  /**
   * Handles mat-drawer openedChange to keep LayoutService in sync.
   *
   * @param opened - New drawer open state
   */
  protected onDrawerOpenedChange(opened: boolean): void {
    this._layoutService.setDrawerOpened(opened);
  }

  protected readonly navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      routerLink: '/dashboard',
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: '✅',
      routerLink: '/tasks',
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: '📅',
      routerLink: '/calendar',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📈',
      routerLink: '/analytics',
    },
    {
      id: 'team',
      label: 'Team',
      icon: '👥',
      routerLink: '/team',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      routerLink: '/settings',
    },
  ];
}
