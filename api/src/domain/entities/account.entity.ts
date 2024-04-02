import { Exception } from '../exception/exception'
import { Entity } from '../interface/entity.abstract'
import { AccountType, accountTypes } from '../types/account.types'
import { AccountGroup } from './account-group.entity'
import { Currency } from './currency.entity'

export class Account extends Entity {
  private name: string
  private type: AccountType
  private currency: Currency
  private balance: number
  private accountGroup: AccountGroup
  private exchangeRate: number

  private constructor() {
    super()
  }

  public static restore(
    uuid: string,
    name: string,
    type: AccountType,
    currency: Currency,
    balance: number,
    accountGroup: AccountGroup,
    exchangeRate: number,
    createdAt: Date,
    updatedAt: Date
  ): Account {
    const account = new Account()

    account.setUuid(uuid)
    account.setName(name)
    account.setType(type)
    account.setCurrency(currency)
    account.setBalance(balance)
    account.setAccountGroup(accountGroup)
    account.setExchangeRate(exchangeRate)
    account.setCreatedAt(createdAt)
    account.setUpdatedAt(updatedAt)

    return account
  }

  public static create(
    uuid: string,
    name: string,
    type: AccountType,
    currency: Currency,
    accountGroup: AccountGroup,
    exchangeRate: number
  ): Account {
    const account = new Account()

    account.setUuid(uuid)
    account.setName(name)
    account.setType(type)
    account.setCurrency(currency)
    account.setBalance(0)
    account.setAccountGroup(accountGroup)
    account.setExchangeRate(exchangeRate)
    account.setCreatedAt(new Date())
    account.setUpdatedAt(new Date())

    return account
  }

  public getName(): string {
    return this.name
  }

  public getType(): AccountType {
    return this.type
  }

  public getCurrency(): Currency {
    return this.currency
  }

  public getBalance(): number {
    return this.balance
  }

  public getAccountGroup(): AccountGroup {
    return this.accountGroup
  }

  public getExchangeRate(): number {
    return this.exchangeRate
  }

  public setName(name: string): void {
    this.validatorService.stringValidator.validateRequired(name) ||
      Exception.throw('Name is required', 'DomainEntity.Account.name', 'Validation')
    this.validatorService.stringValidator.validateType(name) ||
      Exception.throw('Name is invalid', 'DomainEntity.Account.name', 'Validation')
    this.validatorService.stringValidator.validateMinLength(name, 3) ||
      Exception.throw(
        'Name must have at least 3 characters',
        'DomainEntity.Account.name',
        'Validation'
      )
    this.validatorService.stringValidator.validateMaxLength(name, 50) ||
      Exception.throw(
        'Name must have at most 50 characters',
        'DomainEntity.Account.name',
        'Validation'
      )

    this.name = name
    this.setUpdatedAt(new Date())
  }

  public setType(type: AccountType): void {
    this.validatorService.fixedValueValidator.validateRequired(type) ||
      Exception.throw('Type is required', 'DomainEntity.Account.type', 'Validation')
    this.validatorService.fixedValueValidator.validateExists(type, accountTypes) ||
      Exception.throw('Type is invalid', 'DomainEntity.Account.type', 'Validation')

    this.type = type
    this.setUpdatedAt(new Date())
  }

  public setCurrency(currency: Currency): void {
    this.currency = currency
    this.setUpdatedAt(new Date())
  }

  public setBalance(balance: number): void {
    this.validatorService.numberValidator.validateRequired(balance) ||
      Exception.throw('Balance is required', 'DomainEntity.Account.balance', 'Validation')
    this.validatorService.numberValidator.validateType(balance) ||
      Exception.throw('Balance is invalid', 'DomainEntity.Account.balance', 'Validation')

    this.balance = balance
    this.setUpdatedAt(new Date())
  }

  public setAccountGroup(accountGroup: AccountGroup): void {
    this.accountGroup = accountGroup
    this.setUpdatedAt(new Date())
  }

  public setExchangeRate(exchangeRate: number): void {
    this.validatorService.numberValidator.validateRequired(exchangeRate) ||
      Exception.throw(
        'Exchange rate is required',
        'DomainEntity.Account.exchangeRate',
        'Validation'
      )
    this.validatorService.numberValidator.validateType(exchangeRate) ||
      Exception.throw('Exchange rate is invalid', 'DomainEntity.Account.exchangeRate', 'Validation')
    this.validatorService.numberValidator.validateMin(exchangeRate, 0, false) ||
      Exception.throw(
        'Exchange rate must be greater than 0',
        'DomainEntity.Account.exchangeRate',
        'Validation'
      )

    this.exchangeRate = exchangeRate
    this.setUpdatedAt(new Date())
  }
}
