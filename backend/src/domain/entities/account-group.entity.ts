import { Exception } from '../exception/exception'
import { Entity } from '../interface/entity.abstract'
import { AccountType, AccountTypes } from '../types/account.types'
import { Account } from './account.entity'

export class AccountGroup extends Entity {
  private type: AccountType
  private accounts: Account[]

  private constructor() {
    super()
  }

  public getType(): AccountType {
    return this.type
  }

  public getAccounts(): Account[] {
    return this.accounts
  }

  public setType(type: AccountType): void {
    this.validatorService.fixedValueValidator.validateRequired(type) ||
      Exception.throw('Type is required', 'DomainEntity.AccountGroup.type', 'Validation')
    this.validatorService.fixedValueValidator.validateExists(type, AccountTypes) ||
      Exception.throw('Type is invalid', 'DomainEntity.AccountGroup.type', 'Validation')

    this.type = type
    this.setUpdatedAt(new Date())
  }

  public addAccount(account: Account): void {
    this.accounts.push(account)
    this.setUpdatedAt(new Date())
  }

  public removeAccount(account: Account): void {
    this.accounts = this.accounts.filter(a => a.getUuid() !== account.getUuid())
    this.setUpdatedAt(new Date())
  }

  public static restore(
    uuid: string,
    type: AccountType,
    createdAt: Date,
    updatedAt: Date,
    accounts: Account[]
  ): AccountGroup {
    const accountGroup = new AccountGroup()

    accountGroup.setUuid(uuid)
    accountGroup.setType(type)
    accountGroup.setCreatedAt(createdAt)
    accountGroup.setUpdatedAt(updatedAt)
    accountGroup.accounts = accounts

    return accountGroup
  }

  public static create(uuid: string, type: AccountType): AccountGroup {
    const accountGroup = new AccountGroup()

    accountGroup.setUuid(uuid)
    accountGroup.setType(type)
    accountGroup.setCreatedAt(new Date())
    accountGroup.setUpdatedAt(new Date())
    accountGroup.accounts = []

    return accountGroup
  }
}
