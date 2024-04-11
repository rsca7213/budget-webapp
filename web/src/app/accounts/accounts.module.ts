import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AccountsViewComponent } from './accounts.component'
import { AccountsRoutingModule } from './accounts-routing.module'
import { SharedModule } from '../shared/shared.module';
import { AccountGroupListDialogComponent } from './components/account-group-list-dialog/account-group-list-dialog.component'

@NgModule({
  declarations: [AccountsViewComponent, AccountGroupListDialogComponent],
  imports: [CommonModule, AccountsRoutingModule, SharedModule]
})
export class AccountsModule {}
