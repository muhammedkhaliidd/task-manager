import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to transform a string to uppercase
 */
@Pipe({
  name: 'uppercase',
})
export class UppercasePipe implements PipeTransform {
  /**
   * Transforms the string to uppercase
   *
   * @param value - The string to transform
   * @returns The uppercase string
   */
  transform(value: string): string {
    return value?.toUpperCase();
  }
}
