import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginViewComponent } from './login.component'

const routes: Routes = [
  {
    path: '',
    component: LoginViewComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
