import { Exception } from '../exception/exception'
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
    this.validatorService.uuidValidator.validateRequired(uuid) ||
      Exception.throw('Uuid is required', `DomainEntity.${this.constructor.name}.uuid`, 'Validation')
    this.validatorService.uuidValidator.validate(uuid) ||
      Exception.throw('Uuid is invalid', `DomainEntity.${this.constructor.name}.uuid`, 'Validation')

    this.uuid = uuid
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public setCreatedAt(createdAt: Date): void {
    this.validatorService.dateValidator.validateRequired(createdAt) ||
      Exception.throw('CreatedAt is required', `DomainEntity.${this.constructor.name}.createdAt`, 'Validation')

    this.createdAt = createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.validatorService.dateValidator.validateRequired(updatedAt) ||
      Exception.throw('UpdatedAt is required', `DomainEntity.${this.constructor.name}.updatedAt`, 'Validation')

    this.updatedAt = updatedAt
  }

  public equals(entity: Entity): boolean {
    return this.uuid === entity.getUuid()
  }
}
