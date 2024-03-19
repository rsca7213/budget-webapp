import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CustomValidators } from '../../../shared/validators/validations.class'
import { CategoryType, CategoryTypes } from '../../../shared/types/category.types'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'categories-components-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrl: './create-category-dialog.component.scss'
})
export class CreateCategoryDialogComponent {
  public options = {
    type: CategoryTypes
  }

  public form: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    type: new FormControl<CategoryType>('Income', [Validators.required, CustomValidators.categoryType()])
  })

  public constructor(private readonly dialogRef: MatDialogRef<CreateCategoryDialogComponent>) {}

  private resetForm(): void {
    this.form.reset()
    this.form.get('type')?.setValue('Income')
  }

  public createCategory(): void {
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
