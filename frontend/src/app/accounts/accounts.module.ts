import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AccountsView } from './accounts.component'
import { AccountsRoutingModule } from './accounts-routing.module'

@NgModule({
  declarations: [AccountsView],
  imports: [CommonModule, AccountsRoutingModule]
})
export class AccountsModule {}
