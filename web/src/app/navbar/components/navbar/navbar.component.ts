import { Component, EventEmitter, Output, ViewChild } from '@angular/core'
import { APP_PROPERTIES } from '../../../../properties'
import { UserService } from '../../../shared/services/user.service'
import { AuthService } from '../../../shared/services/auth.service'
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component'
import { LoadingDialogComponent } from '../../../shared/components/loading-dialog/loading-dialog.component'
import { Router } from '@angular/router'

@Component({
  selector: 'components-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild(LoadingDialogComponent) public loadingDialog: LoadingDialogComponent
  @ViewChild(ErrorDialogComponent) public errorDialog: ErrorDialogComponent
  @Output() sidenavToggled = new EventEmitter<void>()

  public APP_PROPERTIES = APP_PROPERTIES

  public constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public toggleSidenav(): void {
    this.sidenavToggled.emit()
  }

  public logout(): void {
    this.loadingDialog.open()
    this.userService
      .logout()
      .subscribe({
        next: () => {
          this.authService.removeAuthUser()
          this.router.navigate(['/login'])
        },
        error: error => {
          this.errorDialog.open('An error occurred while logging out.', error.message)
        }
      })
      .add(() => this.loadingDialog.close())
  }
}
