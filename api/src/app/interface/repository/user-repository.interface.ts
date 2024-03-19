import { User } from '../../../domain/entities/user.entity'
import { IRepository } from '../repository.interface'

export interface IUserRepository extends IRepository<User> {
  save(entity: User): Promise<void>

  find(uuid: string): Promise<User | undefined>

  findAll(): Promise<User[]>

  delete(uuid: string): Promise<void>

  findByEmail(email: string): Promise<User | undefined>
}
