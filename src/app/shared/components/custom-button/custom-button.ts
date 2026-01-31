import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule, MatButtonAppearance } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

/**
 * Display mode: icon only, or icon + label (default).
 */
export type CustomButtonType = 'icon-only' | 'default';

/**
 * Position of the icon relative to the label (default type only).
 */
export type CustomButtonIconPosition = 'before' | 'after';

/**
 * Reusable custom button component with two display modes.
 *
 * - **icon-only**: Renders a single icon; emits click when pressed.
 * - **default**: Renders an icon and a label; icon can be before or after the label; emits click.
 *
 * Supports optional color, and optional CSS classes for the host, icon, and label.
 */
@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgClass],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButton {
  /**
   * Display type: 'icon-only' (just icon) or 'default' (icon + label).
   */
  @Input() type: CustomButtonType = 'default';

  /**
   * Material icon name (e.g. 'menu', 'home'). Used in both modes. Optional.
   */
  @Input() icon?: string;

  /**
   * Label text. Used only when type is 'default'. Optional.
   */
  @Input() label?: string;

  /**
   * Position of the icon relative to the label when type is 'default'. Optional.
   */
  @Input() iconPosition: CustomButtonIconPosition = 'before';

  /**
   * Optional color. Pass 'primary' | 'accent' | 'warn' for Material theme, or any class name. Optional.
   */
  @Input() color?: string;

  /**
   * Optional CSS class(es) applied to the button element (host). Optional.
   */
  @Input() cssClass: string = '';

  /**
   * Optional CSS class(es) applied to the mat-icon element. Optional.
   */
  @Input() iconCssClass: string = '';

  /**
   * Optional CSS class(es) applied to the label span (default type only). Optional.
   */
  @Input() labelCssClass: string = '';

  /**
   * Optional appearance of the button.
   */
  @Input() appearance: MatButtonAppearance = 'filled';

  /**
   * Emitted when the button is clicked.
   */
  @Output() clicked = new EventEmitter<void>();

  /**
   * Handles button click and emits the clicked event.
   */
  protected onButtonClick(): void {
    this.clicked.emit();
  }

  /**
   * Material button color when color input is primary, accent, or warn.
   *
   * @returns Theme color for mat-button or undefined
   */
  protected get matColor(): 'primary' | 'accent' | 'warn' | undefined {
    if (
      this.color === 'primary' ||
      this.color === 'accent' ||
      this.color === 'warn'
    ) {
      return this.color;
    }
    return undefined;
  }

  /**
   * Custom color class when color is not a Material theme color.
   *
   * @returns CSS class string or undefined
   */
  protected get customColorClass(): string {
    if (
      this.color &&
      this.color !== 'primary' &&
      this.color !== 'accent' &&
      this.color !== 'warn'
    ) {
      return this.color;
    }
    return '';
  }
}
