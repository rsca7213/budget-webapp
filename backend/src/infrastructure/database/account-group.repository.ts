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
    @InjectRepository(AccountGroupRepository)
    private readonly accountGroupOrmRepository: Repository<AccountGroupDatabaseEntity>,
    @InjectRepository(UserDatabaseEntity)
    private readonly userOrmRepository: Repository<UserDatabaseEntity>
  ) {}

  public save(accountGroup: AccountGroup, userUuid: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  public findAll(userUuid: string): Promise<AccountGroup[]> {
    throw new Error('Method not implemented.')
  }

  public findByName(name: string, userUuid: string): Promise<AccountGroup | undefined> {
    throw new Error('Method not implemented.')
  }
}
