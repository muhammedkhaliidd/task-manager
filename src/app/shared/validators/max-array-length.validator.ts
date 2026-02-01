import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator that checks if a FormArray length exceeds a maximum.
 *
 * @param max - Maximum allowed length
 * @returns ValidatorFn that returns error if length > max
 */
export function maxArrayLength(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!Array.isArray(control.value)) {
      return null;
    }
    if (control.value.length > max) {
      return { maxArrayLength: { max, actual: control.value.length } };
    }
    return null;
  };
}
