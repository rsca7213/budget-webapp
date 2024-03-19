import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { CategoryType } from '../../../domain/types/category.types'
import { UserDatabaseEntity } from './user.orm.entity'

@Entity()
export class CategoryDatabaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  public uuid: string

  @Column()
  public name: string

  @Column()
  public type: CategoryType

  @Column()
  public createdAt: Date

  @Column()
  public updatedAt: Date

  @ManyToOne(() => UserDatabaseEntity, user => user.categories)
  public user: UserDatabaseEntity
}
