import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CustomValidators } from '../shared/validators/validations.class'
import { APP_PROPERTIES } from '../../properties'

@Component({
  selector: 'login-view',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginView {
  public form: FormGroup = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(320)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
      CustomValidators.hasLowercase,
      CustomValidators.hasUppercase,
      CustomValidators.hasNumber,
      CustomValidators.hasSpecialCharacter
    ])
  })

  public APP_PROPERTIES = APP_PROPERTIES
  public passwordInputType: string = 'password'

  public togglePasswordVisibility(): void {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password'
  }

  public resetForm(): void {
    this.form.reset()
  }

  public login(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.resetForm()
  }
}
