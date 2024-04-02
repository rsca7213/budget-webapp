import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginViewComponent } from './login.component'
import { LoginRoutingModule } from './login-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [LoginViewComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, RouterModule, SharedModule]
})
export class LoginModule {}
