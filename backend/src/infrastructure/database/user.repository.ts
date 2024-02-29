import { Injectable } from '@nestjs/common'
import { IUserRepository } from '../../app/interface/repository/user-repository.interface'
import { User } from '../../domain/entities/user.entity'

@Injectable()
export class UserRepository implements IUserRepository {
  public async save(user: User): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async find(uuid: string): Promise<User | undefined> {
    throw new Error('Method not implemented.')
  }

  public async findAll(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  public async delete(uuid: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.')
  }
}
