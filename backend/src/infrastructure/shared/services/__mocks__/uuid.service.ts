import { IUuidService } from 'src/app/interface/uuid-service.interface'

export class UuidService implements IUuidService {
  public generate(): string {
    return '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd742'
  }
}
