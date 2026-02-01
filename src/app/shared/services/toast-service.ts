import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';

/**
 * Toast display mode: 'default' (primary), 'error' (red), 'warn' (orange)
 */
export type ToastMode = 'default' | 'error' | 'warn';

/**
 * Toast service
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toast = inject(MatSnackBar);

  /**
   * Show a toast message.
   *
   * @param message - The message to show
   * @param duration - The duration to show the toast (default 3000ms)
   * @param mode - Display mode: 'default' (primary), 'error' (red), 'warn' (orange)
   * @returns The snack bar reference
   */
  showToast(
    message: string,
    duration: number = 3000,
    mode: ToastMode = 'default',
  ): MatSnackBarRef<SimpleSnackBar> {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: ['toast', `toast--${mode}`],
    };
    return this._toast.open(message, 'close', config);
  }
}
