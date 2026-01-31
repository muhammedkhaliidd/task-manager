import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';

/**
 * Toast service
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toast = inject(MatSnackBar);
  /**
   * Show a toast
   *
   * @param message - The message to show
   * @param duration - The duration to show the toast
   * @returns The snack bar reference
   */
  showToast(
    message: string,
    duration: number = 3000,
  ): MatSnackBarRef<SimpleSnackBar> {
    return this._toast.open(message, 'close', { duration });
  }
}
