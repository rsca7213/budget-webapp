import { Currency } from '../../domain/entities/currency.entity'
import { Exception } from '../../domain/exception/exception'
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

  public async create(
    name: string,
    code: string,
    exchangeRate: number,
    userUuid: string
  ): Promise<Currency> {
    const uuid = this.uuidService.generate()

    const currency = Currency.create(uuid, name, code, exchangeRate, false)

    const codeExists = await this.currencyRepository.findByCode(code, userUuid)
    const nameExists = await this.currencyRepository.findByName(name, userUuid)

    if (codeExists)
      Exception.throw(
        `Currency by code ${code} already exists`,
        'ApplicationService.Currency.create',
        'Verification'
      )

    if (nameExists)
      Exception.throw(
        `Currency by name ${name} already exists`,
        'ApplicationService.Currency.create',
        'Verification'
      )

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
}
