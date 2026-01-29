import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
import { LettersCircleContainerComponent } from '../../../shared/components/letters-circle-container/letters-circle-container.component';
import { LayoutService } from '../../services/layout.service';
import { CustomButton } from '../../../shared/components/custom-button/custom-button';

/**
 * App header component used in the application.
 *
 * Includes a burger menu button that toggles the sidenav drawer (visible on all viewports).
 */
@Component({
  selector: 'app-app-header',
  imports: [
    CustomInput,
    LettersCircleContainerComponent,
    MatButtonModule,
    MatIconModule,
    CustomButton,
  ],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  private readonly _layoutService = inject(LayoutService);

  protected searchControl = new FormControl('');

  /**
   * Toggles the sidenav drawer open/closed (used by burger menu button).
   */
  protected toggleDrawer(): void {
    this._layoutService.toggleDrawer();
  }
}
