import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Category } from '../../../shared/models/category.model'

@Component({
  selector: 'components-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrl: './delete-category-dialog.component.scss'
})
export class DeleteCategoryDialogComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly category: Category
  ) {}

  public deleteCategory(): void {
    this.dialogRef.close(this.category.uuid)
  }

  public closeDialog(): void {
    this.dialogRef.close()
  }
}
