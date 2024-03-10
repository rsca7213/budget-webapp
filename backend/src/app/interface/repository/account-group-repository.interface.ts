import { AccountGroup } from '../../../domain/entities/account-group.entity'
import { IRepository } from '../repository.interface'

export interface IAccountGroupRepository extends IRepository<AccountGroup> {
  save(accountGroup: AccountGroup, userUuid: string): Promise<boolean>

  findAll(userUuid: string): Promise<AccountGroup[]>

  findByName(name: string, userUuid: string): Promise<AccountGroup | undefined>
}
