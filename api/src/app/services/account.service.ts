import { IAccountRepository } from '../interface/repository/account-repository.interface'
import { IUuidService } from '../interface/uuid-service.interface'

export class AccountService {
  public constructor(
    private readonly uuidService: IUuidService,
    private readonly accountRepository: IAccountRepository
  ) {}
}
