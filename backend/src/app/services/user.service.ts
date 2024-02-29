import { User } from '../../domain/entities/user.entity'
import { Exception } from '../../domain/exception/exception'
import { IHashService } from '../interface/hash-service.interface'
import { IUserRepository } from '../interface/repository/user-repository.interface'
import { IUuidService } from '../interface/uuid-service.interface'

export class UserService {
  public constructor(
    private readonly uuidService: IUuidService,
    private readonly hashService: IHashService,
    private readonly userRepository: IUserRepository
  ) {}

  public async create(name: string, email: string, password: string): Promise<User> {
    const uuid = this.uuidService.generate()

    const hash = await this.hashService.hash(password)
    const user = User.create(uuid, name, email, hash)
    user.validatePasswordValue(password)

    const userBySameEmail = await this.userRepository.findByEmail(email)

    if (userBySameEmail && userBySameEmail.equals(user))
      Exception.throw('User with email already exists', 'ApplicationService.UserService.create', 'Verification')

    this.userRepository.save(user)

    return user
  }
}
