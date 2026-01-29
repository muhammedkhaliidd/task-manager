import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TwoLettersPipe } from '../../../shared/pipes/two-letters.pipe';

/**
 * Component to display a circle with the first two letters of a sentence
 */
@Component({
  selector: 'app-letters-circle-container',
  templateUrl: './letters-circle-container.component.html',
  styleUrls: ['./letters-circle-container.component.scss'],
  standalone: true,
  imports: [TwoLettersPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LettersCircleContainerComponent {
  @Input() sentence!: string;
}
