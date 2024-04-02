import { AccountGroup } from '../../../domain/entities/account-group.entity'

export interface IAccountGroupRepository {
  save(accountGroup: AccountGroup, userUuid: string): Promise<boolean>

  findAll(userUuid: string): Promise<AccountGroup[]>

  findByName(name: string, userUuid: string): Promise<AccountGroup | undefined>
}
