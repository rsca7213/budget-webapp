import { Currency } from '../../domain/entities/currency.entity'
import { Exception } from '../../domain/exception/exception'
import { calculateSwappedExchangeRates } from '../helpers/currency.helper'
import { ICurrencyRepository } from '../interface/repository/currency-repository.interface'
import { IUuidService } from '../interface/uuid-service.interface'

export class CurrencyService {
  public constructor(
    private readonly uuidService: IUuidService,
    private readonly currencyRepository: ICurrencyRepository
  ) {}

  public async findAll(userUuid: string): Promise<Currency[]> {
    return await this.currencyRepository.findAll(userUuid)
  }

  public async find(uuid: string, userUuid: string): Promise<Currency | undefined> {
    const currency = await this.currencyRepository.find(uuid, userUuid)

    if (!currency) {
      Exception.throw('Currency was not found', 'ApplicationService.Currency.find', 'NotFound')
      return
    }

    return currency
  }

  public async create(
    name: string,
    code: string,
    exchangeRate: number,
    userUuid: string
  ): Promise<Currency | undefined> {
    const uuid = this.uuidService.generate()

    const currency = Currency.create(uuid, name, code, exchangeRate, false)

    const codeExists = await this.currencyRepository.findByCode(code, userUuid)
    const nameExists = await this.currencyRepository.findByName(name, userUuid)

    if (codeExists) {
      Exception.throw(
        `Currency by code ${code} already exists`,
        'ApplicationService.Currency.create',
        'Verification'
      )
      return
    }

    if (nameExists) {
      Exception.throw(
        `Currency by name ${name} already exists`,
        'ApplicationService.Currency.create',
        'Verification'
      )
      return
    }

    const count = await this.currencyRepository.count(userUuid)

    if (count === 0) {
      currency.setIsDefault(true)
      currency.setExchangeRate(1)
    }

    const result = await this.currencyRepository.save(currency, userUuid)

    if (!result)
      Exception.throw(
        'Currency could not be created',
        'ApplicationService.Currency.create',
        'Repository'
      )

    return currency
  }

  public async update(
    uuid: string,
    name: string,
    code: string,
    exchangeRate: number,
    userUuid: string
  ): Promise<Currency | undefined> {
    const currency = await this.currencyRepository.find(uuid, userUuid)

    if (!currency) {
      Exception.throw(`Currency was not found`, 'ApplicationService.Currency.update', 'NotFound')
      return
    }

    const codeExists = await this.currencyRepository.findByCode(code, userUuid)
    const nameExists = await this.currencyRepository.findByName(name, userUuid)

    if (codeExists && codeExists.getUuid() !== uuid)
      Exception.throw(
        `Currency by code ${code} already exists`,
        'ApplicationService.Currency.update',
        'Verification'
      )

    if (nameExists && nameExists.getUuid() !== uuid)
      Exception.throw(
        `Currency by name ${name} already exists`,
        'ApplicationService.Currency.update',
        'Verification'
      )

    currency.setName(name)
    currency.setCode(code)
    currency.setExchangeRate(currency.getIsDefault() ? 1 : exchangeRate)

    const result = await this.currencyRepository.save(currency, userUuid)

    if (!result)
      Exception.throw(
        'Currency could not be updated',
        'ApplicationService.Currency.update',
        'Repository'
      )

    return currency
  }

  public async delete(uuid: string, userUuid: string): Promise<void> {
    const currency = await this.currencyRepository.find(uuid, userUuid)

    if (!currency) {
      Exception.throw(`Currency was not found`, 'ApplicationService.Currency.delete', 'NotFound')
      return
    }

    if (currency.getIsDefault()) {
      Exception.throw(
        'Default currency cannot be removed',
        'ApplicationService.Currency.delete',
        'Verification'
      )
      return
    }

    const result = await this.currencyRepository.delete(uuid, userUuid)

    if (!result)
      Exception.throw(
        'Currency could not be removed',
        'ApplicationService.Currency.delete',
        'Repository'
      )
  }

  public async swapDefaultCurrency(
    uuid: string,
    userUuid: string
  ): Promise<Currency[] | undefined> {
    const currencies = await this.currencyRepository.findAll(userUuid)

    const newCurrency = currencies.find(c => c.getUuid() === uuid)
    const oldCurrency = currencies.find(c => c.getIsDefault())

    if (!newCurrency || !oldCurrency) {
      Exception.throw(
        'Currency was not found',
        'ApplicationService.Currency.swapDefaultCurrency',
        'NotFound'
      )
      return
    }

    if (newCurrency.getIsDefault()) {
      Exception.throw(
        'Currency is already default',
        'ApplicationService.Currency.swapDefaultCurrency',
        'Verification'
      )
      return
    }

    oldCurrency.setIsDefault(false)
    newCurrency.setIsDefault(true)

    const exchangeRates = calculateSwappedExchangeRates(
      oldCurrency,
      newCurrency,
      currencies.filter(
        c => c.getUuid() !== newCurrency.getUuid() && c.getUuid() !== oldCurrency.getUuid()
      )
    )

    for (const exchangeRate of exchangeRates) {
      const currency = currencies.find(c => c.getCode() === exchangeRate.code)

      if (currency) currency.setExchangeRate(exchangeRate.rate)
    }

    currencies.find(c => c.getIsDefault())?.setExchangeRate(1)

    const result = await this.currencyRepository.saveAll(currencies, userUuid)

    if (!result)
      Exception.throw(
        'Currencies could not be updated',
        'ApplicationService.Currency.swapDefaultCurrency',
        'Repository'
      )

    return currencies
  }
}
