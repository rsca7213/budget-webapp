import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RegisterView } from './register.component'

const routes: Routes = [
  {
    path: '',
    component: RegisterView
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
