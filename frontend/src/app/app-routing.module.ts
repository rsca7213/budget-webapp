import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeView } from './home/home.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeView
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
