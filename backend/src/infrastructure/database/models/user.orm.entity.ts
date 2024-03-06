import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { CategoryDatabaseEntity } from './category.orm.entity'
import { CurrencyDatabaseEntity } from './currency.orm.entity'

@Entity()
export class UserDatabaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  public uuid: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  public password: string

  @Column()
  public createdAt: Date

  @Column()
  public updatedAt: Date

  @OneToMany(() => CategoryDatabaseEntity, category => category.user)
  public categories: CategoryDatabaseEntity[]

  @OneToMany(() => CurrencyDatabaseEntity, currency => currency.user)
  public currencies: CurrencyDatabaseEntity[]
}
