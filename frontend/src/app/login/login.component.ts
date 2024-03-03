import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'login-view',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginView {
  public form: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(128)])
  })

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
