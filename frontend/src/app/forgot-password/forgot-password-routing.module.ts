import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ForgotPasswordView } from './forgot-password.component'

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordView
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule {}
