import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavbarComponent } from './components/navbar/navbar.component'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [NavbarComponent, SidenavComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [NavbarComponent, SidenavComponent]
})
export class NavbarModule {}
