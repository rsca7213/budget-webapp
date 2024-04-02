import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AccountsViewComponent } from './accounts.component'
import { AccountsRoutingModule } from './accounts-routing.module'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [AccountsViewComponent],
  imports: [CommonModule, AccountsRoutingModule, SharedModule]
})
export class AccountsModule {}
