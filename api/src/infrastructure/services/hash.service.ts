import { Injectable } from '@nestjs/common'
import { IHashService } from '../../app/interface/hash-service.interface'
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService implements IHashService {
  public async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 12)
  }

  public compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }
}
