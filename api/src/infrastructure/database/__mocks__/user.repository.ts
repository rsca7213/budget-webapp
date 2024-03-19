import { Injectable } from '@nestjs/common'
import { IUserRepository } from '../../../app/interface/repository/user-repository.interface'
import { User } from '../../../domain/entities/user.entity'

@Injectable()
export class UserRepository implements IUserRepository {
  private users: User[] = [
    User.create(
      'cde4d425-c343-4a3d-bb0e-266f9331f165',
      'User 1',
      'user1@email.com',
      '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVW'
    ),
    User.create(
      'cde4d425-c343-4a3d-bb0e-266f9331f166',
      'User 2',
      'user2@email.com',
      '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVW'
    ),
    User.create(
      'cde4d425-c343-4a3d-bb0e-266f9331f167',
      'User 3',
      'user3@email.com',
      '$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVW'
    )
  ]

  public async save(user: User): Promise<void> {
    this.users.push(user)
  }

  public async find(uuid: string): Promise<User | undefined> {
    return this.users.find(user => user.getUuid() === uuid)
  }

  public async findAll(): Promise<User[]> {
    return this.users
  }

  public async delete(uuid: string): Promise<void> {
    this.users = this.users.filter(user => user.getUuid() !== uuid)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.getEmail() === email)
  }
}
