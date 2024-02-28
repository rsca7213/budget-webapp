import { Injectable, Logger } from '@nestjs/common'
import { DomainValidatorService } from 'src/domain/services/validator.service'

@Injectable()
export class BootstrapServerService {
  private readonly logger = new Logger(BootstrapServerService.name)

  public startDomainValidationService(): void {
    DomainValidatorService.generateInstance()
    this.logger.log('Domain validation service succesfully started')
  }
}
