import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivityOverlayService } from '../../services/activity-overlay.service';
import { RecentActivity } from '../recent-activity/recent-activity';

/**
 * Activity overlay: backdrop + panel rendered at app level (outside side-nav)
 * so it stacks above the Material drawer.
 */
@Component({
  selector: 'app-activity-overlay',
  imports: [RecentActivity],
  templateUrl: './activity-overlay.html',
  styleUrl: './activity-overlay.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityOverlay {
  private readonly _service = inject(ActivityOverlayService);

  protected readonly isOpen = this._service.isOpen;

  /**
   * Closes the activity overlay
   */
  protected close(): void {
    this._service.close();
  }
}
