import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AccountsView } from './accounts.component'
import { AccountsRoutingModule } from './accounts-routing.module'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [AccountsView],
  imports: [CommonModule, AccountsRoutingModule, SharedModule]
})
export class AccountsModule {}
