import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterRoutingModule } from './register-routing.module'
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'
import { RegisterViewComponent } from './register.component'

@NgModule({
  declarations: [RegisterViewComponent],
  imports: [CommonModule, RegisterRoutingModule, SharedModule, ReactiveFormsModule]
})
export class RegisterModule {}
