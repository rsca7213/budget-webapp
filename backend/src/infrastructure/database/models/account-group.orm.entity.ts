import { Column, Entity, PrimaryColumn } from 'typeorm'
import { AccountType } from '../../../domain/types/account.types'

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
}
