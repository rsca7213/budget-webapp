import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { CategoryTypes } from '../types/category.types'

export class CustomValidators {
  static categoryType(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      if (CategoryTypes.includes(value)) {
        return null
      } else {
        return { categoryType: true }
      }
    }
  }
}
