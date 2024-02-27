import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavbarComponent } from './components/navbar/navbar.component'
import { AngularMaterialModule } from '../angular-material.module'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [NavbarComponent, SidenavComponent],
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  exports: [NavbarComponent, SidenavComponent]
})
export class NavbarModule {}
