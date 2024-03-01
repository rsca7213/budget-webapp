import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeView } from './home.component'
import { HomeRoutingModule } from './home-routing.module'

@NgModule({
  declarations: [HomeView],
  imports: [CommonModule, HomeRoutingModule]
})
export class HomeModule {}
