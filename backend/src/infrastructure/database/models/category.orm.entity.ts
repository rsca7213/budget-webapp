import { Column, Entity, PrimaryColumn } from 'typeorm'
import { CategoryType, CategoryTypes } from '../../../domain/types/category.types'

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
}
