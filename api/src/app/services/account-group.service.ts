import { AccountGroup } from '../../domain/entities/account-group.entity'
import { Exception } from '../../domain/exception/exception'
import { AccountType } from '../../domain/types/account.types'
import { IAccountGroupRepository } from '../interface/repository/account-group-repository.interface'
import { IUuidService } from '../interface/uuid-service.interface'

export class AccountGroupService {
  public constructor(
    private readonly uuidService: IUuidService,
    private readonly accountGroupRepository: IAccountGroupRepository
  ) {}

  public async findAll(userUuid: string): Promise<AccountGroup[]> {
    return await this.accountGroupRepository.findAll(userUuid)
  }

  public async create(name: string, type: AccountType, userUuid: string): Promise<AccountGroup> {
    const uuid = this.uuidService.generate()

    const accountGroup = AccountGroup.create(uuid, name, type)

    const existing = await this.accountGroupRepository.findByName(name, userUuid)

    if (existing)
      Exception.throw(
        `Account group named ${name} already exists`,
        'ApplicationService.AccountGroup.create',
        'Verification'
      )

    const result = await this.accountGroupRepository.save(accountGroup, userUuid)

    if (!result)
      Exception.throw(
        'Account group could not be created',
        'ApplicationService.AccountGroup.create',
        'Repository'
      )

    return accountGroup
  }
}
