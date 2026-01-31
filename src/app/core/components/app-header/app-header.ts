import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
import { LettersCircleContainerComponent } from '../../../shared/components/letters-circle-container/letters-circle-container.component';
import { LayoutService } from '../../services/layout.service';
import { CustomButton } from '../../../shared/components/custom-button/custom-button';
import { debounceTime } from 'rxjs';
import { TASKS_STORE } from '../../../features/tasks/store/tasks-store';

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
export class AppHeader implements OnInit {
  private readonly _layoutService = inject(LayoutService);
  private readonly _tasksStore = inject(TASKS_STORE);
  protected searchControl = new FormControl('');

  /**
   * Toggles the sidenav drawer open/closed (used by burger menu button).
   */
  protected toggleDrawer(): void {
    this._layoutService.toggleDrawer();
  }

  /**
   * Listens to the search control value changes and debounces the value.
   */
  ngOnInit(): void {
    this.listenToSearchControl();
  }

  /**
   * Listens to the search control value changes and debounces the value.
   */
  listenToSearchControl(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this._tasksStore.setFilter({
          ...this._tasksStore.filter(),
          search: value ?? '',
        });
      });
  }
}
