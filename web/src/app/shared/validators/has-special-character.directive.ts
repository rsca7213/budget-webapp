import { Directive } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms'
import { CustomValidators } from './validations.class'

@Directive({
  selector: '[hasSpecialCharacter]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: HasSpecialCharacterValidator,
      multi: true
    }
  ]
})
export class HasSpecialCharacterValidator implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.hasSpecialCharacter()(control)
  }
}
