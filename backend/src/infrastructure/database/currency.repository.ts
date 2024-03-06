import { Injectable } from '@nestjs/common'
import { ICurrencyRepository } from '../../app/interface/repository/currency-repository.interface'
import { CurrencyDatabaseEntity } from './models/currency.orm.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDatabaseEntity } from './models/user.orm.entity'
import { Repository } from 'typeorm'
import { Currency } from '../../domain/entities/currency.entity'

@Injectable()
export class CurrencyRepository implements ICurrencyRepository {
  public constructor(
    @InjectRepository(CurrencyDatabaseEntity)
    private readonly currencyOrmRepository: Repository<CurrencyDatabaseEntity>,
    @InjectRepository(UserDatabaseEntity)
    private readonly userOrmRepository: Repository<UserDatabaseEntity>
  ) {}

  public async save(currency: Currency, userUuid: string): Promise<boolean> {
    const currencyDatabaseEntity = new CurrencyDatabaseEntity()
    const userOrmRepository = await this.userOrmRepository.findOneBy({ uuid: userUuid })

    if (!userOrmRepository) return false

    currencyDatabaseEntity.uuid = currency.getUuid()
    currencyDatabaseEntity.name = currency.getName()
    currencyDatabaseEntity.code = currency.getCode()
    currencyDatabaseEntity.exchangeRate = currency.getExchangeRate()
    currencyDatabaseEntity.isDefault = currency.getIsDefault()
    currencyDatabaseEntity.createdAt = currency.getCreatedAt()
    currencyDatabaseEntity.updatedAt = currency.getUpdatedAt()

    await this.currencyOrmRepository.save(currencyDatabaseEntity)
    return true
  }

  public async find(uuid: string, userUuid: string): Promise<Currency | undefined> {
    const currency = await this.currencyOrmRepository.findOneBy({ uuid, user: { uuid: userUuid } })

    if (!currency) return undefined

    return Currency.restore(
      currency.uuid,
      currency.name,
      currency.code,
      currency.exchangeRate,
      currency.isDefault,
      currency.createdAt,
      currency.updatedAt
    )
  }

  public async findAll(userUuid: string): Promise<Currency[]> {
    const currencies = await this.currencyOrmRepository.findBy({ user: { uuid: userUuid } })

    return currencies.map(currency =>
      Currency.restore(
        currency.uuid,
        currency.name,
        currency.code,
        currency.exchangeRate,
        currency.isDefault,
        currency.createdAt,
        currency.updatedAt
      )
    )
  }

  public async delete(uuid: string, userUuid: string): Promise<boolean> {
    await this.currencyOrmRepository.delete({ uuid, user: { uuid: userUuid } })
    return true
  }
}
