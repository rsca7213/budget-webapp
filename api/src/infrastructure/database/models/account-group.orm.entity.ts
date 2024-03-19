import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { AccountType } from '../../../domain/types/account.types'
import { UserDatabaseEntity } from './user.orm.entity'

@Entity()
export class AccountGroupDatabaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  public uuid: string

  @Column()
  public name: string

  @Column()
  public type: AccountType

  @Column()
  public createdAt: Date

  @Column()
  public updatedAt: Date

  @ManyToOne(() => UserDatabaseEntity, user => user.accountGroups)
  public user: UserDatabaseEntity
}
