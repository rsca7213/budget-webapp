import { Component, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CustomValidators } from '../shared/validators/validations.class'
import { APP_PROPERTIES } from '../../properties'
import { UserService } from '../shared/services/user.service'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { Router } from '@angular/router'
import { AuthService } from '../shared/services/auth.service'

@Component({
  selector: 'views-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginViewComponent {
  @ViewChild(ErrorDialogComponent) public errorDialog: ErrorDialogComponent
  @ViewChild(LoadingDialogComponent) public loadingDialog: LoadingDialogComponent

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
      CustomValidators.hasLowercase(),
      CustomValidators.hasUppercase(),
      CustomValidators.hasNumber(),
      CustomValidators.hasSpecialCharacter()
    ])
  })

  public APP_PROPERTIES = APP_PROPERTIES
  public passwordInputType: string = 'password'

  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  public togglePasswordVisibility(): void {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password'
  }

  public resetForm(): void {
    this.form.reset()
  }

  public login(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.loadingDialog.open()
    this.userService
      .login(this.form.value)
      .subscribe({
        next: async () => {
          await this.authService.getAuthUser()
          this.router.navigate(['/'])
        },
        error: error => {
          this.errorDialog.open('Login failed', error.message)
        }
      })
      .add(() => this.loadingDialog.close())
  }
}
