import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginView } from './login.component'
import { LoginRoutingModule } from './login-routing.module'
import { AngularMaterialModule } from '../angular-material.module'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [LoginView],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LoginModule {}
