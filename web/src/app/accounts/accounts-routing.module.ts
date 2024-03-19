import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AccountsViewComponent } from './accounts.component'

const routes: Routes = [
  {
    path: '',
    component: AccountsViewComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {}
