import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { AccountGroup } from '../../../shared/models/account-group.model'

@Component({
  selector: 'components-account-group-list-dialog',
  templateUrl: './account-group-list-dialog.component.html',
  styleUrl: './account-group-list-dialog.component.scss'
})
export class AccountGroupListDialogComponent implements OnInit {
  public incomeAccountGroups: AccountGroup[]
  public expenseAccountGroups: AccountGroup[]

  public constructor(
    private readonly dialogRef: MatDialogRef<AccountGroupListDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly accountGroups: AccountGroup[]
  ) {}

  public ngOnInit(): void {
    this.accountGroups.push({
      uuid: '00000000-0000-0000-0000-000000000000',
      name: 'Test',
      type: 'Income',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    this.accountGroups.push({
      uuid: '00000000-0000-0000-0000-000000000001',
      name: 'Test',
      type: 'Expense',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    this.incomeAccountGroups = this.getIncomeAccountGroups()
    this.expenseAccountGroups = this.getExpenseAccountGroups()
  }

  public getIncomeAccountGroups(): AccountGroup[] {
    return this.accountGroups.filter((accountGroup: AccountGroup) => accountGroup.type === 'Income')
  }

  public getExpenseAccountGroups(): AccountGroup[] {
    return this.accountGroups.filter(
      (accountGroup: AccountGroup) => accountGroup.type === 'Expense'
    )
  }

  public closeDialog(): void {
    this.dialogRef.close()
  }
}
