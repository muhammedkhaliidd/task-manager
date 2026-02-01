import { inject, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

/**
 * Dialog service
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly _dialog = inject(MatDialog);
  /**
   * Open a dialog
   *
   * @param component - The component to open
   * @param config - The config for the dialog
   * @returns The dialog reference
   */
  openDialog<T, D = unknown, R = unknown>(
    component: ComponentType<T>,
    config?: MatDialogConfig<D>,
  ): MatDialogRef<T, R> {
    return this._dialog.open<T, D, R>(component, config);
  }
}
