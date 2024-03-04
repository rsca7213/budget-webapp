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

  static hasNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      if (/\d/.test(value)) {
        return null
      } else {
        return { hasNumber: true }
      }
    }
  }

  static hasUppercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      if (/[A-Z]/.test(value)) {
        return null
      } else {
        return { hasCapitalCase: true }
      }
    }
  }

  static hasLowercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      if (/[a-z]/.test(value)) {
        return null
      } else {
        return { hasLowerCase: true }
      }
    }
  }

  static hasSpecialCharacter(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      if (!/[0-9a-zA-Z]/.test(value)) {
        return null
      } else {
        return { hasSpecialCharacter: true }
      }
    }
  }
}
