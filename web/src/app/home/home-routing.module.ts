import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeView } from './home.component'

const routes: Routes = [
  {
    path: '',
    component: HomeView
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
