import { Pipe, type PipeTransform } from '@angular/core';

/**
 * Pipe to format a date as relative time (e.g. "2 hours ago", "Just now")
 */
@Pipe({
  name: 'appRelativeTime',
  standalone: true,
})
export class RelativeTimePipe implements PipeTransform {
  /**
   * Transform ISO date string to relative time string
   *
   * @param value - ISO date string
   * @returns Relative time string
   */
  transform(value: string): string {
    if (!value) return '';
    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 10) return 'Just now';
    if (diffSec < 60) return `${diffSec} sec ago`;
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
  }
}
