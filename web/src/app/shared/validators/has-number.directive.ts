import { Directive } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms'
import { CustomValidators } from './validations.class'

@Directive({
  selector: '[hasNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: HasNumberValidator,
      multi: true
    }
  ]
})
export class HasNumberValidator implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.hasNumber()(control)
  }
}
