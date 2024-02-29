import { Column, Entity, PrimaryColumn } from 'typeorm'

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
}
