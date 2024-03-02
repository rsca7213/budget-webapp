import { Directive } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms'
import { CustomValidators } from './validations.class'

@Directive({
  selector: '[categoryType]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CategoryTypeValidator,
      multi: true
    }
  ]
})
export class CategoryTypeValidator implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.categoryType()(control)
  }
}
