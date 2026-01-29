import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
import { FormControl } from '@angular/forms';
import { LettersCircleContainerComponent } from '../../../shared/components/letters-circle-container/letters-circle-container.component';

/**
 * App header component selector used in the application.
 */
@Component({
  selector: 'app-app-header',
  imports: [CustomInput, LettersCircleContainerComponent],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  protected searchControl = new FormControl('');
}
