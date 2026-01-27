import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/**
 * Application configuration for dependency injection
 *
 * Configures the root-level providers for the Angular application including:
 * - Global error listeners for unhandled errors
 * - Zone.js change detection with event coalescing for better performance
 * - Router configuration with application routes
 *
 * This configuration is used in main.ts when bootstrapping the application.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
