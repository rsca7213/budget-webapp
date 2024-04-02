import { Currency } from '../../../domain/entities/currency.entity'
export interface ICurrencyRepository {
  save(entity: Currency, userUuid: string): Promise<boolean>

  saveAll(entities: Currency[], userUuid: string): Promise<boolean>

  find(uuid: string, userUuid: string): Promise<Currency | undefined>

  findAll(userUuid: string): Promise<Currency[]>

  delete(uuid: string, userUuid: string): Promise<boolean>

  findByCode(code: string, userUuid: string): Promise<Currency | undefined>

  findByName(name: string, userUuid: string): Promise<Currency | undefined>

  count(userUuid: string): Promise<number>
}
