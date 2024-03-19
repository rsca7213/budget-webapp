import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterView } from './register.component'
import { RegisterRoutingModule } from './register-routing.module'
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [RegisterView],
  imports: [CommonModule, RegisterRoutingModule, SharedModule, ReactiveFormsModule]
})
export class RegisterModule {}
