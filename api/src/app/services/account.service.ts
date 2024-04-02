import { IUuidService } from '../interface/uuid-service.interface'

export class AccountService {
  public constructor(private readonly uuidService: IUuidService) {}
}
