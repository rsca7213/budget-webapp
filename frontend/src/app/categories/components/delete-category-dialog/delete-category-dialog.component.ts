import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'categories-components-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrl: './delete-category-dialog.component.scss'
})
export class DeleteCategoryDialogComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly uuid: string
  ) {}

  public deleteCategory(): void {
    this.dialogRef.close(this.uuid)
  }

  public closeDialog(): void {
    this.dialogRef.close()
  }
}
