import { Account } from '../../../domain/entities/account.entity'
import { IRepository } from '../repository.interface'

export interface IAccountRepository extends IRepository<Account> {}
