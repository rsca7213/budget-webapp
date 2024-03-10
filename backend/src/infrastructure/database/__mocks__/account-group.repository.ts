import { Injectable } from '@nestjs/common'
import { IAccountGroupRepository } from '../../../app/interface/repository/account-group-repository.interface'
import { AccountGroup } from '../../../domain/entities/account-group.entity'

@Injectable()
export class AccountGroupRepository implements IAccountGroupRepository {
  private users = [
    {
      uuid: 'cde4d425-c343-4a3d-bb0e-266f9331f171',
      accountGroups: [
        AccountGroup.create('cde4d425-c343-4a3d-bb0e-266f9331f165', 'Banks', 'Income'),
        AccountGroup.create('cde4d425-c343-4a3d-bb0e-266f9331f166', 'Wallets', 'Income'),
        AccountGroup.create('cde4d425-c343-4a3d-bb0e-266f9331f167', 'Credit Cards', 'Expense')
      ]
    }
  ]

  public async save(accountGroup: AccountGroup, userUuid: string): Promise<boolean> {
    const user = this.users.find(user => user.uuid === userUuid)
    if (!user) return false
    const current = user.accountGroups.find(current => current.getUuid() === accountGroup.getUuid())
    if (current) {
      current.setName(accountGroup.getName())
      current.setType(accountGroup.getType())
      return true
    }
    user.accountGroups.push(accountGroup)
    return true
  }

  public async findAll(userUuid: string): Promise<AccountGroup[]> {
    const user = this.users.find(user => user.uuid === userUuid)
    if (!user) return []
    return user.accountGroups
  }

  public async findByName(name: string, userUuid: string): Promise<AccountGroup | undefined> {
    const user = this.users.find(user => user.uuid === userUuid)
    if (!user) return undefined
    return user.accountGroups.find(accountGroup => accountGroup.getName() === name)
  }
}
