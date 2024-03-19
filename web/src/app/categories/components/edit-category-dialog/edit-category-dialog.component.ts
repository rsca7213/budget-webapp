import { Component, Inject } from '@angular/core'
import { CategoryType, CategoryTypes } from '../../../shared/types/category.types'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CustomValidators } from '../../../shared/validators/validations.class'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'categories-components-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrl: './edit-category-dialog.component.scss'
})
export class EditCategoryDialogComponent {
  public options = {
    type: CategoryTypes
  }

  public form: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    type: new FormControl<CategoryType>('Income', [Validators.required, CustomValidators.categoryType()])
  })

  public constructor(
    private readonly dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      name: string
      type: CategoryType
    }
  ) {}

  public ngOnInit(): void {
    this.resetForm()
  }

  private resetForm(): void {
    this.form.reset()
    this.form.get('name')?.setValue(this.data.name)
    this.form.get('type')?.setValue(this.data.type)
  }

  public editCategory(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.dialogRef.close(this.form.value)
    this.resetForm()
  }

  public closeDialog(): void {
    this.resetForm()
    this.dialogRef.close()
  }
}
