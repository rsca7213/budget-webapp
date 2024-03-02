import { Component, EventEmitter, Output } from '@angular/core'
import { APP_ROUTES } from '../../../app-routing.module'

@Component({
  selector: 'navbar-components-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Output() public close = new EventEmitter<void>()

  public routes = APP_ROUTES
}
