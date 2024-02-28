import { Injectable } from '@nestjs/common'
import { IUuidService } from 'src/app/interface/uuid-service.interface'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UuidService implements IUuidService {
  public generate(): string {
    return uuidv4()
  }
}
