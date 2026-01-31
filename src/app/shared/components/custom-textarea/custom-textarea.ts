import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

/**
 * Reusable textarea component built on top of Angular Material.
 * Mirrors custom-input styling with mat-form-field outline appearance.
 *
 * Features:
 * - Accepts an external reactive `FormControl`
 * - Supports configurable label, placeholder, and rows
 * - Optional prefix/suffix (text or Material icon)
 * - Fully OnPush and standalone
 */
@Component({
  selector: 'app-custom-textarea',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgClass,
  ],
  templateUrl: './custom-textarea.html',
  styleUrl: './custom-textarea.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTextarea {
  /**
   * External reactive form control driving the textarea value and validation state.
   */
  @Input({ required: true }) control!: FormControl<unknown>;

  /**
   * Floating label displayed inside the form field.
   */
  @Input() label?: string;

  /**
   * Placeholder text shown when the textarea is empty.
   */
  @Input() placeholder = '';

  /**
   * Number of visible rows.
   */
  @Input() rows = 4;

  /**
   * Optional hint text shown below the textarea.
   */
  @Input() hint?: string;

  /**
   * Optional prefix text rendered at the start.
   */
  @Input() prefixText?: string;

  /**
   * Optional Material icon name rendered at the start.
   */
  @Input() prefixIcon?: string;

  /**
   * Optional suffix text rendered at the end.
   */
  @Input() suffixText?: string;

  /**
   * Optional Material icon name rendered at the end.
   */
  @Input() suffixIcon?: string;

  /**
   * Marks the textarea as read-only when true.
   */
  @Input() readonly = false;

  /**
   * Optional height class for the textarea container.
   */
  @Input() heightClass = 'min-h-[120px]';

  /**
   * Determines if error state should be shown.
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
