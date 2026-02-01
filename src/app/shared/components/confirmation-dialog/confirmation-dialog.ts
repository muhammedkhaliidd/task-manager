import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CustomButton } from '../custom-button/custom-button';

/**
 * Data passed to the confirmation dialog
 */
export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** 'primary' for normal actions, 'warn' for destructive (e.g. delete) */
  confirmColor?: 'primary' | 'warn';
}

/**
 * Confirmation dialog component
 */
@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, CustomButton],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialog {
  private readonly _dialogRef = inject(MatDialogRef<ConfirmationDialog>);
  readonly data: ConfirmationDialogData = inject(MAT_DIALOG_DATA);

  /**
   * Get the confirm label
   *
   * @returns The confirm label
   */
  protected get confirmLabel(): string {
    return this.data.confirmLabel ?? 'Confirm';
  }

  /**
   * Get the cancel label
   *
   * @returns The cancel label
   */
  protected get cancelLabel(): string {
    return this.data.cancelLabel ?? 'Cancel';
  }

  /**
   * Get the confirm color
   *
   * @returns The confirm color
   */
  protected get confirmColor(): 'primary' | 'warn' {
    return this.data.confirmColor ?? 'primary';
  }

  /**
   * Confirm the dialog
   */
  onConfirm(): void {
    this._dialogRef.close(true);
  }

  /**
   * Cancel the dialog
   */
  onCancel(): void {
    this._dialogRef.close(false);
  }
}
