import { Exception } from '../exception/exception'
import { Entity } from '../interface/entity.abstract'

export class Currency extends Entity {
  private name: string
  private code: string
  private exchangeRate: number
  private isDefault: boolean

  private constructor() {
    super()
  }

  public getName(): string {
    return this.name
  }

  public getCode(): string {
    return this.code
  }

  public getExchangeRate(): number {
    return this.exchangeRate
  }

  public getIsDefault(): boolean {
    return this.isDefault
  }

  public setName(name: string): void {
    this.validatorService.stringValidator.validateRequired(name) ||
      Exception.throw('Name is required', 'DomainEntity.Currency.name', 'Validation')
    this.validatorService.stringValidator.validateType(name) ||
      Exception.throw('Name is invalid', 'DomainEntity.Currency.name', 'Validation')
    this.validatorService.stringValidator.validateMinLength(name, 3) ||
      Exception.throw(
        'Name must have at least 3 characters',
        'DomainEntity.Currency.name',
        'Validation'
      )
    this.validatorService.stringValidator.validateMaxLength(name, 50) ||
      Exception.throw(
        'Name must have at most 50 characters',
        'DomainEntity.Currency.name',
        'Validation'
      )

    this.name = name
    this.setUpdatedAt(new Date())
  }

  public setCode(code: string): void {
    this.validatorService.stringValidator.validateRequired(code) ||
      Exception.throw('Code is required', 'DomainEntity.Currency.code', 'Validation')
    this.validatorService.stringValidator.validateType(code) ||
      Exception.throw('Code is invalid', 'DomainEntity.Currency.code', 'Validation')
    this.validatorService.stringValidator.validateMinLength(code, 3) ||
      Exception.throw(
        'Code must have at least 3 characters',
        'DomainEntity.Currency.code',
        'Validation'
      )
    this.validatorService.stringValidator.validateMaxLength(code, 3) ||
      Exception.throw(
        'Code must have at most 3 characters',
        'DomainEntity.Currency.code',
        'Validation'
      )

    this.code = code
    this.setUpdatedAt(new Date())
  }

  public setExchangeRate(exchangeRate: number): void {
    this.validatorService.numberValidator.validateRequired(exchangeRate) ||
      Exception.throw(
        'Exchange rate is required',
        'DomainEntity.Currency.exchangeRate',
        'Validation'
      )
    this.validatorService.numberValidator.validateType(exchangeRate) ||
      Exception.throw(
        'Exchange rate is invalid',
        'DomainEntity.Currency.exchangeRate',
        'Validation'
      )
    this.validatorService.numberValidator.validateMin(exchangeRate, 0) ||
      Exception.throw(
        'Exchange rate must be greater than or equal to 0',
        'DomainEntity.Currency.exchangeRate',
        'Validation'
      )

    this.exchangeRate = exchangeRate
    this.setUpdatedAt(new Date())
  }

  public setIsDefault(isDefault: boolean): void {
    this.validatorService.booleanValidator.validateRequired(isDefault) ||
      Exception.throw('Is default is required', 'DomainEntity.Currency.isDefault', 'Validation')
    this.validatorService.booleanValidator.validateType(isDefault) ||
      Exception.throw('Is default is invalid', 'DomainEntity.Currency.isDefault', 'Validation')

    this.isDefault = isDefault
    this.setUpdatedAt(new Date())
  }

  public static restore(
    uuid: string,
    name: string,
    code: string,
    exchangeRate: number,
    isDefault: boolean,
    createdAt: Date,
    updatedAt: Date
  ): Currency {
    const currency = new Currency()

    currency.setUuid(uuid)
    currency.setName(name)
    currency.setCode(code)
    currency.setExchangeRate(exchangeRate)
    currency.setIsDefault(isDefault)
    currency.setCreatedAt(createdAt)
    currency.setUpdatedAt(updatedAt)

    return currency
  }

  public static create(
    uuid: string,
    name: string,
    code: string,
    exchangeRate: number,
    isDefault: boolean
  ): Currency {
    const currency = new Currency()

    currency.setUuid(uuid)
    currency.setName(name)
    currency.setCode(code)
    currency.setExchangeRate(exchangeRate)
    currency.setIsDefault(isDefault)
    currency.setCreatedAt(new Date())
    currency.setUpdatedAt(new Date())

    return currency
  }
}
