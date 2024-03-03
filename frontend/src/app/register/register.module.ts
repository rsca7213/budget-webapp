import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterView } from './register.component'
import { RegisterRoutingModule } from './register-routing.module'

@NgModule({
  declarations: [RegisterView],
  imports: [CommonModule, RegisterRoutingModule]
})
export class RegisterModule {}
