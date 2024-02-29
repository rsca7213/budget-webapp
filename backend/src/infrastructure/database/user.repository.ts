import { Injectable } from '@nestjs/common'
import { IUserRepository } from '../../app/interface/repository/user-repository.interface'
import { User } from '../../domain/entities/user.entity'

@Injectable()
export class UserRepository implements IUserRepository {
  public save(user: User): void {
    throw new Error('Method not implemented.')
  }

  public find(uuid: string): User | undefined {
    throw new Error('Method not implemented.')
  }

  public findAll(): User[] {
    throw new Error('Method not implemented.')
  }

  public delete(uuid: string): void {
    throw new Error('Method not implemented.')
  }
}
