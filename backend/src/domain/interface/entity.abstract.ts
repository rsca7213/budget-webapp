import { DomainException } from '../exception/exception'
import { DomainValidatorService } from '../services/validator.service'

export abstract class Entity {
  protected uuid: string
  protected createdAt: Date
  protected updatedAt: Date

  protected readonly validatorService: DomainValidatorService

  protected constructor() {
    this.validatorService = DomainValidatorService.getInstance()
  }

  public getUuid(): string {
    return this.uuid
  }

  public setUuid(uuid: string): void {
    this.validatorService.uuidValidator.validate_required(uuid) ||
      DomainException.throw('Uuid is required', `${this.constructor.name}.uuid`, 'Validation')
    this.validatorService.uuidValidator.validate(uuid) ||
      DomainException.throw('Uuid is invalid', `${this.constructor.name}.uuid`, 'Validation')

    this.uuid = uuid
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public setCreatedAt(createdAt: Date): void {
    this.validatorService.dateValidator.validate_required(createdAt) ||
      DomainException.throw('CreatedAt is required', `${this.constructor.name}.createdAt`, 'Validation')

    this.createdAt = createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.validatorService.dateValidator.validate_required(updatedAt) ||
      DomainException.throw('UpdatedAt is required', `${this.constructor.name}.updatedAt`, 'Validation')

    this.updatedAt = updatedAt
  }
}
