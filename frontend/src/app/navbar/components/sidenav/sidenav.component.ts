import { Component } from '@angular/core'
import { APP_ROUTES } from '../../../app-routing.module'

@Component({
  selector: 'navbar-components-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  public routes = APP_ROUTES
}
