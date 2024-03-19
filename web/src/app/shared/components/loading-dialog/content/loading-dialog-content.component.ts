import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'shared-components-loading-dialog-content',
  templateUrl: './loading-dialog-content.component.html',
  styleUrl: './loading-dialog-content.component.scss'
})
export class LoadingDialogContentComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<LoadingDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly info: void
  ) {}

  public closeDialog(): void {
    this.dialogRef.close()
  }
}
