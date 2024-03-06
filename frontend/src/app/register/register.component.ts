import { Component, ViewChild } from '@angular/core'
import { APP_PROPERTIES } from '../../properties'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CustomValidators } from '../shared/validators/validations.class'
import { UserService } from '../shared/services/user.service'
import { Router } from '@angular/router'
import { AuthService } from '../shared/services/auth.service'
import { NotificationComponent } from '../shared/components/notification/notification.component'

@Component({
  selector: 'register-view',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterView {
  @ViewChild(ErrorDialogComponent) public errorDialog: ErrorDialogComponent
  @ViewChild(LoadingDialogComponent) public loadingDialog: LoadingDialogComponent
  @ViewChild(NotificationComponent) public notification: NotificationComponent

  public APP_PROPERTIES = APP_PROPERTIES
  public passwordInputType: string = 'password'

  public form: FormGroup = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
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

  public register(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.loadingDialog.open()
    this.userService
      .register(this.form.value)
      .subscribe({
        next: async () => {
          this.notification.notify('User registered successfully', 'Close')
          this.router.navigate(['/login'])
        },
        error: error => {
          this.errorDialog.open('Failed to register user', error.message)
        }
      })
      .add(() => this.loadingDialog.close())
  }
}
