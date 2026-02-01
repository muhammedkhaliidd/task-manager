import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { of, tap } from 'rxjs';

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Cache entry
 */
interface CacheEntry {
  response: HttpResponse<unknown>;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

/**
 * Check if a cached response is still valid
 *
 * @param entry - The cache entry to check
 * @returns True if the cache entry is still valid, false otherwise
 */
function isCacheValid(entry: CacheEntry): boolean {
  return Date.now() - entry.timestamp < CACHE_TTL_MS;
}

/**
 * HTTP interceptor that caches GET responses.
 * Only GET requests are cached. Mutating requests invalidate related cache entries.
 *
 * @param req - The request to cache
 * @param next - The next handler to call
 * @returns The observable
 */
export const cacheInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  // Skip cache when explicitly requested (e.g. X-Skip-Cache: true)
  if (req.headers.has('X-Skip-Cache')) {
    return next(req);
  }

  // Only cache GET requests
  if (req.method !== 'GET') {
    // Invalidate all cache when mutating to keep data consistent
    cache.clear();
    return next(req);
  }

  const cacheKey = req.urlWithParams;
  const cached = cache.get(cacheKey);

  if (cached && isCacheValid(cached)) {
    return of(cached.response.clone());
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(cacheKey, {
          response: event.clone(),
          timestamp: Date.now(),
        });
      }
    }),
  );
};
