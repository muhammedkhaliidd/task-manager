import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DialogService } from './dialog-service';
import {
  ConfirmationDialog,
  ConfirmationDialogData,
} from '../components/confirmation-dialog/confirmation-dialog';

/**
 * Configuration for the confirmation dialog
 */
export interface ConfirmationConfig {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** 'primary' for normal actions, 'warn' for destructive (e.g. delete) */
  confirmColor?: 'primary' | 'warn';
}

/**
 * Service for user interactions: confirmation dialogs, etc.
 */
@Injectable({
  providedIn: 'root',
})
export class InteractionsService {
  private readonly _dialogService = inject(DialogService);

  /**
   * Show a confirmation dialog.
   *
   * @param config - Configuration for the dialog
   * @returns Observable that emits true if confirmed, false if cancelled
   */
  showConfirmation(config: ConfirmationConfig): Observable<boolean> {
    const data: ConfirmationDialogData = {
      title: config.title,
      message: config.message,
      confirmLabel: config.confirmLabel,
      cancelLabel: config.cancelLabel,
      confirmColor: config.confirmColor ?? 'primary',
    };
    const ref = this._dialogService.openDialog<
      ConfirmationDialog,
      ConfirmationDialogData,
      boolean
    >(ConfirmationDialog, {
      width: '400px',
      data,
      disableClose: false,
      autoFocus: false,
    });
    return ref.afterClosed().pipe(map((result) => result === true));
  }
}
