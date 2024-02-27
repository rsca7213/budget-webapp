import { Injectable } from '@nestjs/common'
import { DomainValidatorService } from 'src/domain/services/validator.service'

@Injectable()
export class BootstrapServer {
  public startExceptionService(): void {
    DomainValidatorService.generateInstance()
  }
}
