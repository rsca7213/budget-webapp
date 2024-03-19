import { Component, EventEmitter, Output } from '@angular/core'
import { APP_ROUTES } from '../../../app-routing.module'

@Component({
  selector: 'components-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Output() public closeSidenav = new EventEmitter<void>()

  public routes = APP_ROUTES.filter(route => route.sidebar)
}
