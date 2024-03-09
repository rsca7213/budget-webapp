import { Component, OnInit, ViewChild } from '@angular/core'
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
export class RegisterView implements OnInit {
  @ViewChild(ErrorDialogComponent) public errorDialog: ErrorDialogComponent
  @ViewChild(LoadingDialogComponent) public loadingDialog: LoadingDialogComponent
  @ViewChild(NotificationComponent) public notification: NotificationComponent

  public APP_PROPERTIES = APP_PROPERTIES
  public passwordInputType: string = 'password'
  public passwordStrength: number = 0

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
    ]),
    confirmPassword: new FormControl<string>('', [Validators.required])
  })

  public constructor(private readonly userService: UserService, private readonly router: Router) {}

  public togglePasswordVisibility(): void {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password'
  }

  public passwordMatchValidation(): void {
    if (this.form.get('password')!.value === this.form.get('confirmPassword')!.value) return

    this.form.get('confirmPassword')!.setErrors({ passwordMatch: true })
  }

  public startPasswordMatchValidation(): void {
    this.form.get('confirmPassword')!.valueChanges.subscribe(() => this.passwordMatchValidation())
  }

  public determinePasswordStrength(): void {
    this.passwordStrength = this.userService.determinePasswordStrength(
      this.form.get('password')!.value
    )
  }

  public startPasswordStrengthValidation(): void {
    this.form.get('password')!.valueChanges.subscribe(() => this.determinePasswordStrength())
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

  public ngOnInit(): void {
    this.startPasswordMatchValidation()
    this.startPasswordStrengthValidation()
  }
}
