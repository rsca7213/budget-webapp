import { Directive } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms'
import { CustomValidators } from './validations.class'

@Directive({
  selector: '[hasLowercase]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: HasLowercaseValidator,
      multi: true
    }
  ]
})
export class HasLowercaseValidator implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.hasLowercase()(control)
  }
}
