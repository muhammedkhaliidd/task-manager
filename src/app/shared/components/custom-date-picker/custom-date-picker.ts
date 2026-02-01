import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgClass } from '@angular/common';

/**
 * Reusable date picker component built on top of Angular Material.
 * Mirrors custom-input styling with mat-form-field outline appearance.
 *
 * Features:
 * - Accepts an external reactive `FormControl` (Date | null)
 * - Supports configurable label and placeholder
 * - Optional prefix/suffix (text or Material icon)
 * - Fully OnPush and standalone
 */
@Component({
  selector: 'app-custom-date-picker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    NgClass,
  ],
  templateUrl: './custom-date-picker.html',
  styleUrl: './custom-date-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDatePicker {
  /**
   * External reactive form control driving the date value and validation state.
   * Expects Date | null.
   */
  @Input({ required: true }) control!: FormControl<Date | null>;

  /**
   * Floating label displayed inside the form field.
   */
  @Input() label?: string;

  /**
   * Placeholder text shown when no date is selected.
   */
  @Input() placeholder = 'Choose a date';

  /**
   * Optional hint text shown below the date picker.
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
   * Optional height class for the date picker container.
   */
  @Input() heightClass = 'h-40';

  /**
   * Minimum selectable date.
   */
  @Input() min?: Date;

  /**
   * Maximum selectable date.
   */
  @Input() max?: Date;

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
