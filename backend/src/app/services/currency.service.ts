import { Currency } from '../../domain/entities/currency.entity'
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
}
