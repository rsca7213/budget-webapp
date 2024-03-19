import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ForgotPasswordViewComponent } from './forgot-password.component'

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordViewComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule {}
