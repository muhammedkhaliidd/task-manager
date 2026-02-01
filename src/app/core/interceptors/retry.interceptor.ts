import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { retry, throwError, timer } from 'rxjs';

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

/**
 * Determine if a failed request should be retried
 *
 * @param error - The error to check
 * @returns True if the request should be retried, false otherwise
 */
function shouldRetry(error: unknown): boolean {
  if (error instanceof HttpErrorResponse) {
    const status = error.status;
    // Retry on network errors (status 0), 5xx, 429
    if (status === 0) return true;
    if (status >= 500) return true;
    if (status === 429) return true; // Rate limit
    return false;
  }
  return true; // Retry on unknown errors (e.g. network failure)
}

/**
 * HTTP interceptor that retries failed requests.
 * Retries on network errors, 5xx, and 429. Does not retry on 4xx client errors.
 *
 * @param req - The request to retry
 * @param next - The next handler to call
 * @returns The observable
 */
export const retryInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  return next(req).pipe(
    retry({
      count: MAX_RETRIES,
      delay: (error, retryCount) => {
        if (!shouldRetry(error)) {
          return throwError(() => error);
        }
        return timer(RETRY_DELAY_MS * retryCount);
      },
    }),
  );
};
