import { Currency } from '../../../domain/entities/currency.entity'
import { IRepository } from '../repository.interface'

export interface ICurrencyRepository extends IRepository<Currency> {
  save(entity: Currency, userUuid: string): Promise<boolean>

  find(uuid: string, userUuid: string): Promise<Currency | undefined>

  findAll(userUuid: string): Promise<Currency[]>

  delete(uuid: string, userUuid: string): Promise<boolean>
}
