import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

/**
 * Reusable dynamic input component built on top of Angular Material.
 *
 * Features:
 * - Accepts an external reactive `FormControl`
 * - Supports configurable label and placeholder
 * - Optional prefix/suffix that can be plain text or Material icon
 * - Fully OnPush and standalone for optimal performance
 */
@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgClass,
  ],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInput {
  /**
   * External reactive form control driving the input value and validation state.
   */
  @Input({ required: true }) control!: FormControl<unknown>;

  /**
   * Floating label displayed inside the form field.
   */
  @Input() label?: string;

  /**
   * Placeholder text shown when the input is empty.
   */
  @Input() placeholder = '';

  /**
   * HTML input type for the underlying input element.
   */
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';

  /**
   * Optional hint text shown below the input.
   */
  @Input() hint?: string;

  /**
   * Optional prefix text rendered at the start of the input.
   */
  @Input() prefixText?: string;

  /**
   * Optional Material icon name rendered at the start of the input.
   *
   * When provided together with `prefixText`, both will be displayed.
   */
  @Input() prefixIcon?: string;

  /**
   * Optional suffix text rendered at the end of the input.
   */
  @Input() suffixText?: string;

  /**
   * Optional Material icon name rendered at the end of the input.
   *
   * When provided together with `suffixText`, both will be displayed.
   */
  @Input() suffixIcon?: string;

  /**
   * Optional autocomplete attribute forwarded to the native input.
   */
  @Input() autocomplete?: string;

  /**
   * Marks the input as read-only when true.
   */
  @Input() readonly = false;

  /**
   * Marks the input as disabled when true.
   * Note: this does not modify the `FormControl` disabled state,
   * it only affects the native input element.
   */
  @Input() disabled = false;

  /**
   * Optional height class of the input.
   */
  @Input() heightClass = 'h-32';

  /**
   * Convenience getter to determine if current control state is invalid and should show errors.
   *
   * @returns True if the control is invalid and touched or dirty, false otherwise.
   */
  protected get showError(): boolean {
    if (!this.control) {
      return false;
    }

    return this.control.invalid && (this.control.touched || this.control.dirty);
  }
}
