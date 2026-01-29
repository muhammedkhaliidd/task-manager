import { Pipe, type PipeTransform } from '@angular/core';

/**
 * Pipe to extract the first two letters of a sentence
 */
@Pipe({
  name: 'appTwoLetters',
  standalone: true,
})
export class TwoLettersPipe implements PipeTransform {
  /**
   * Transform the sentence to the first two letters
   *
   * @param sentence - The sentence to extract the first two letters from
   * @returns The first two letters of the sentence
   */
  transform(sentence: string): string {
    return (
      sentence
        ?.split(' ')
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join('') ?? ''
    );
  }
}
