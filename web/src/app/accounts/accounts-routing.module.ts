import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AccountsView } from './accounts.component'

const routes: Routes = [
  {
    path: '',
    component: AccountsView
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {}
