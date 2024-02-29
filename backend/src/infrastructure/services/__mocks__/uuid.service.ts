import { IUuidService } from 'src/app/interface/uuid-service.interface'

export class UuidService implements IUuidService {
  public uuids: string[] = [
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd742',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd743',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd744',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd745',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd746',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd747',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd748',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd749',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd750',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd751',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd752',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd753',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd754',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd755',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd756',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd757',
    '6d6a9b03-8a3c-4d39-8119-f9cf8a9fd758'
  ]

  public generate(): string {
    return this.uuids.shift() || ''
  }
}
