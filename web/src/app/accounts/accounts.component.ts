import { Component, OnInit } from '@angular/core'
import { LoadingState } from '../shared/types/loading-state.types'
import { AccountGroupsService } from '../shared/services/account-groups.service'
import { AccountGroup } from '../shared/models/account-group.model'
import { AccountGroupListDialogComponent } from './components/account-group-list-dialog/account-group-list-dialog.component'
import { APP_DIALOG_SIZES } from '../shared/constants/dialog-sizes.constant'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'views-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsViewComponent implements OnInit {
  public viewState: LoadingState = 'loading'

  public accountGroups: AccountGroup[]

  public constructor(
    private readonly accountGroupsService: AccountGroupsService,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.loadView()
  }

  public loadView(): void {
    this.viewState = 'loading'
    this.accountGroupsService.getAll().subscribe({
      next: (accountGroups: AccountGroup[]) => {
        this.accountGroups = accountGroups
        this.viewState = 'ready'
      },
      error: () => {
        this.viewState = 'error'
      }
    })
  }

  public openCreateCurrencyDialog(): void {
    this.dialog.open(AccountGroupListDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: this.accountGroups
    })
  }
}
