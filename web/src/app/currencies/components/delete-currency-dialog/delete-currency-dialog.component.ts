import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Currency } from '../../../shared/models/currency.model'

@Component({
  selector: 'components-delete-currency-dialog',
  templateUrl: './delete-currency-dialog.component.html',
  styleUrl: './delete-currency-dialog.component.scss'
})
export class DeleteCurrencyDialogComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<DeleteCurrencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly currency: Currency
  ) {}

  public deleteCurrency(): void {
    this.dialogRef.close(this.currency.uuid)
  }

  public closeDialog(): void {
    this.dialogRef.close()
  }
}
