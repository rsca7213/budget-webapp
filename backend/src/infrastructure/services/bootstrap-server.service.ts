import { Injectable, Logger } from '@nestjs/common'
import { DomainValidatorService } from '../../domain/services/validator.service'

@Injectable()
export class BootstrapServerService {
  private readonly logger = new Logger(BootstrapServerService.name)

  public startDomainValidationService(log: boolean): void {
    DomainValidatorService.generateInstance()
    if (log) this.logger.log('Domain validation service succesfully started')
  }
}
