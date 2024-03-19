import { Injectable } from '@nestjs/common'
import { IUserRepository } from '../../app/interface/repository/user-repository.interface'
import { User } from '../../domain/entities/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDatabaseEntity } from './models/user.orm.entity'

@Injectable()
export class UserRepository implements IUserRepository {
  public constructor(
    @InjectRepository(UserDatabaseEntity)
    private readonly usersOrmRepository: Repository<UserDatabaseEntity>
  ) {}

  public async save(user: User): Promise<void> {
    const userDatabaseEntity = new UserDatabaseEntity()
    userDatabaseEntity.uuid = user.getUuid()
    userDatabaseEntity.name = user.getName()
    userDatabaseEntity.email = user.getEmail()
    userDatabaseEntity.password = user.getHash()
    userDatabaseEntity.createdAt = user.getCreatedAt()
    userDatabaseEntity.updatedAt = user.getUpdatedAt()

    await this.usersOrmRepository.save(userDatabaseEntity)
  }

  public async find(uuid: string): Promise<User | undefined> {
    const user = await this.usersOrmRepository.findOneBy({ uuid })
    if (!user) return undefined

    return User.restore(user.uuid, user.name, user.email, user.password, user.createdAt, user.updatedAt)
  }

  public async findAll(): Promise<User[]> {
    const users = await this.usersOrmRepository.find()

    return users.map(user =>
      User.restore(user.uuid, user.name, user.email, user.password, user.createdAt, user.updatedAt)
    )
  }

  public async delete(uuid: string): Promise<void> {
    await this.usersOrmRepository.delete(uuid)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersOrmRepository.findOneBy({ email })
    if (!user) return undefined

    return User.restore(user.uuid, user.name, user.email, user.password, user.createdAt, user.updatedAt)
  }
}
