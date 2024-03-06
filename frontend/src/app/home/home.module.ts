import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeView } from './home.component'
import { HomeRoutingModule } from './home-routing.module'
import { SharedModule } from '../shared/shared.module'
import { AngularMaterialModule } from '../angular-material.module'

@NgModule({
  declarations: [HomeView],
  imports: [CommonModule, HomeRoutingModule, SharedModule, AngularMaterialModule]
})
export class HomeModule {}
