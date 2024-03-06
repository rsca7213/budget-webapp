import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { UserDatabaseEntity } from './user.orm.entity'

@Entity()
export class CurrencyDatabaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  public uuid: string

  @Column()
  public name: string

  @Column()
  public code: string

  @Column()
  public exchangeRate: number

  @Column()
  public isDefault: boolean

  @Column()
  public createdAt: Date

  @Column()
  public updatedAt: Date

  @ManyToOne(() => UserDatabaseEntity, user => user.currencies)
  public user: UserDatabaseEntity
}
