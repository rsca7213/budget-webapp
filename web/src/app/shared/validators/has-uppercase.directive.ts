import { Directive } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms'
import { CustomValidators } from './validations.class'

@Directive({
  selector: '[hasUppercase]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: HasUppercaseValidator,
      multi: true
    }
  ]
})
export class HasUppercaseValidator implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.hasUppercase()(control)
  }
}
