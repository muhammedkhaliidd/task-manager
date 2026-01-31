import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Skeleton loading component. Renders placeholder lines with a shimmer animation.
 * Each line is narrower than the one above for a typical text-block skeleton look.
 */
@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skeleton {
  /**
   * Height of each skeleton line in pixels.
   */
  @Input() lineHeight: number = 12;

  /**
   * Number of skeleton lines to render.
   */
  @Input() lines: number = 3;

  /**
   * Array of indices for template iteration.
   *
   * @returns Array of numbers from 0 to lines - 1.
   */
  protected get linesArray(): number[] {
    return Array.from({ length: this.lines }, (_, i) => i);
  }

  /**
   * Returns the width percentage for the given line index (0-based).
   * Each line is narrower than the one above: 100%, ~88%, ~76%, ~64%, ...
   *
   * @param index - The index of the line.
   * @returns The width percentage for the given line index.
   */
  getWidthPercent(index: number): number {
    const step = 12;
    return Math.max(40, 100 - index * step);
  }
}
