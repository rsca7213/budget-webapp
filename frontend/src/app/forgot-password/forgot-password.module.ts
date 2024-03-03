import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ForgotPasswordView } from './forgot-password.component'
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module'

@NgModule({
  declarations: [ForgotPasswordView],
  imports: [CommonModule, ForgotPasswordRoutingModule]
})
export class ForgotPasswordModule {}
