import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ForgotPasswordViewComponent } from './forgot-password.component'
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module'

@NgModule({
  declarations: [ForgotPasswordViewComponent],
  imports: [CommonModule, ForgotPasswordRoutingModule]
})
export class ForgotPasswordModule {}
