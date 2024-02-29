import { User } from '../../../domain/entities/user.entity'
import { IRepository } from '../repository.interface'

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | undefined>
}
