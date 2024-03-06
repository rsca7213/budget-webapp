import { Injectable } from '@nestjs/common'
import { ICurrencyRepository } from '../../../app/interface/repository/currency-repository.interface'
import { Currency } from '../../../domain/entities/currency.entity'

@Injectable()
export class CurrencyRepository implements ICurrencyRepository {
  private users = [
    {
      uuid: 'cde4d425-c343-4a3d-bb0e-266f9331f171',
      currencies: [
        Currency.create('cde4d425-c343-4a3d-bb0e-266f9331f165', 'Euro', 'EUR', 1.0, true),
        Currency.create('cde4d425-c343-4a3d-bb0e-266f9331f166', 'Dollar', 'USD', 0.95, false),
        Currency.create('cde4d425-c343-4a3d-bb0e-266f9331f167', 'Pound', 'GBP', 0.91, false)
      ]
    }
  ]

  public async save(currency: Currency, userUuid: string): Promise<boolean> {
    const user = this.users.find(user => user.uuid === userUuid)
    if (!user) return false
    user.currencies.push(currency)
    return true
  }

  public async find(uuid: string, userUuid: string): Promise<Currency | undefined> {
    const user = this.users.find(user => user.uuid === userUuid)
    if (!user) return undefined
    return user.currencies.find(currency => currency.getUuid() === uuid)
  }

  public async findAll(userUuid: string): Promise<Currency[]> {
    const user = this.users.find(user => user.uuid === userUuid)
    if (!user) return []
    return user.currencies
  }

  public async delete(uuid: string, userUuid: string): Promise<boolean> {
    const user = this.users.find(user => user.uuid === userUuid)
    if (!user) return false
    user.currencies = user.currencies.filter(currency => currency.getUuid() !== uuid)
    return true
  }
}
