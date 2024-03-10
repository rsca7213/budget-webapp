import { Injectable } from '@nestjs/common'
import { IAccountGroupRepository } from '../../app/interface/repository/account-group-repository.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDatabaseEntity } from './models/user.orm.entity'
import { Repository } from 'typeorm'
import { AccountGroup } from '../../domain/entities/account-group.entity'
import { AccountGroupDatabaseEntity } from './models/account-group.orm.entity'

@Injectable()
export class AccountGroupRepository implements IAccountGroupRepository {
  public constructor(
    @InjectRepository(AccountGroupDatabaseEntity)
    private readonly accountGroupOrmRepository: Repository<AccountGroupDatabaseEntity>,
    @InjectRepository(UserDatabaseEntity)
    private readonly userOrmRepository: Repository<UserDatabaseEntity>
  ) {}

  public async save(accountGroup: AccountGroup, userUuid: string): Promise<boolean> {
    const userDatabaseEntity = await this.userOrmRepository.findOneBy({ uuid: userUuid })
    if (!userDatabaseEntity) return false

    const accountGroupDatabaseEntity = new AccountGroupDatabaseEntity()
    accountGroupDatabaseEntity.uuid = accountGroup.getUuid()
    accountGroupDatabaseEntity.name = accountGroup.getName()
    accountGroupDatabaseEntity.type = accountGroup.getType()
    accountGroupDatabaseEntity.createdAt = accountGroup.getCreatedAt()
    accountGroupDatabaseEntity.updatedAt = accountGroup.getUpdatedAt()
    accountGroupDatabaseEntity.user = userDatabaseEntity

    await this.accountGroupOrmRepository.save(accountGroupDatabaseEntity)

    return true
  }

  public async findAll(userUuid: string): Promise<AccountGroup[]> {
    const accountGroups = await this.accountGroupOrmRepository.findBy({ user: { uuid: userUuid } })

    return accountGroups.map(accountGroup => {
      return AccountGroup.restore(
        accountGroup.uuid,
        accountGroup.name,
        accountGroup.type,
        accountGroup.createdAt,
        accountGroup.updatedAt,
        []
      )
    })
  }

  public async findByName(name: string, userUuid: string): Promise<AccountGroup | undefined> {
    const accountGroup = await this.accountGroupOrmRepository.findOneBy({
      name,
      user: { uuid: userUuid }
    })

    if (!accountGroup) return undefined

    return AccountGroup.restore(
      accountGroup.uuid,
      accountGroup.name,
      accountGroup.type,
      accountGroup.createdAt,
      accountGroup.updatedAt,
      []
    )
  }
}
