import { Component, EventEmitter, Output } from '@angular/core'
import { APP_PROPERTIES } from '../../../../properties'

@Component({
  selector: 'navbar-components-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public APP_PROPERTIES = APP_PROPERTIES

  @Output() sidenavToggled = new EventEmitter<void>()

  public constructor() {}

  public toggleSidenav(): void {
    this.sidenavToggled.emit()
  }
}
