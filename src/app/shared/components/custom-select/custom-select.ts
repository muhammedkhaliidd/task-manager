import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

/**
 * Option item for the select.
 */
export interface CustomSelectOption<T = unknown> {
  value: T;
  label: string;
}

/**
 * Reusable select component built on top of Angular Material.
 * Mirrors custom-input styling with mat-form-field outline appearance.
 *
 * Features:
 * - Accepts an external reactive `FormControl`
 * - Supports configurable label, placeholder, and options
 * - Optional prefix/suffix (text or Material icon)
 * - Fully OnPush and standalone
 */
@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    NgClass,
  ],
  templateUrl: './custom-select.html',
  styleUrl: './custom-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelect {
  /**
   * External reactive form control driving the select value and validation state.
   */
  @Input({ required: true }) control!: FormControl<unknown>;

  /**
   * Floating label displayed inside the form field.
   */
  @Input() label?: string;

  /**
   * Placeholder shown when no option is selected.
   */
  @Input() placeholder = 'Select an option';

  /**
   * Options to display. Each has value and label.
   */
  @Input() options: CustomSelectOption[] = [];

  /**
   * Optional hint text shown below the select.
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
   * Optional height class for the select container.
   */
  @Input() heightClass = 'h-40';

  /**
   * Whether multiple options can be selected.
   */
  @Input() multiple = false;

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
