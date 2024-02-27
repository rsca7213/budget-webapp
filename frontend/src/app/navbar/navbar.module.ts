import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavbarComponent } from './components/navbar/navbar.component'
import { AngularMaterialModule } from '../angular-material.module'
import { SidenavComponent } from './components/sidenav/sidenav.component'

@NgModule({
  declarations: [NavbarComponent, SidenavComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [NavbarComponent, SidenavComponent]
})
export class NavbarModule {}
