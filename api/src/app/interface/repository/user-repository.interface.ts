import { User } from '../../../domain/entities/user.entity'

export interface IUserRepository {
  save(entity: User): Promise<void>

  find(uuid: string): Promise<User | undefined>

  findAll(): Promise<User[]>

  delete(uuid: string): Promise<void>

  findByEmail(email: string): Promise<User | undefined>
}
