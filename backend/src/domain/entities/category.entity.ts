import { Entity } from '../interface/entity.abstract'
import { DomainException } from '../exception/exception'
import { DomainValidatorService } from '../services/validator.service'
import { CategoryType, CategoryTypes } from '../types/category.types'

export class Category extends Entity {
  private readonly validatorService: DomainValidatorService

  private constructor(
    uuid: string,
    createdAt: Date,
    updatedAt: Date,
    private name: string,
    private type: CategoryType
  ) {
    super(uuid, createdAt, updatedAt)
    this.validatorService = DomainValidatorService.getInstance()
  }

  public getName(): string {
    return this.name
  }

  public getType(): CategoryType {
    return this.type
  }

  public setName(name: string): void {
    this.validatorService.stringValidator.validate_required(name) ||
      DomainException.throw('Name is required', 'Category.name', 'Validation')
    this.validatorService.stringValidator.validate_type(name) ||
      DomainException.throw('Name is invalid', 'Category.name', 'Validation')
    this.validatorService.stringValidator.validate_min_length(name, 3) ||
      DomainException.throw('Name must have at least 3 characters', 'Category.name', 'Validation')
    this.validatorService.stringValidator.validate_max_length(name, 100) ||
      DomainException.throw('Name must have at most 100 characters', 'Category.name', 'Validation')

    this.name = name
  }

  public setType(type: CategoryType): void {
    this.validatorService.fixedValueValidator.validate_required(type) ||
      DomainException.throw('Type is required', 'Category.type', 'Validation')
    this.validatorService.fixedValueValidator.validate_exists(type, CategoryTypes) ||
      DomainException.throw('Type is invalid', 'Category.type', 'Validation')

    this.type = type
  }

  public static create(uuid: string, name: string, type: CategoryType): Category {
    const validatorService = DomainValidatorService.getInstance()

    const createdAt = new Date()
    const updatedAt = new Date()

    validatorService.uuidValidator.validate_required(uuid) ||
      DomainException.throw('Uuid is required', 'Category.uuid', 'Validation')
    validatorService.uuidValidator.validate(uuid) ||
      DomainException.throw('Uuid is invalid', 'Category.uuid', 'Validation')

    validatorService.stringValidator.validate_required(name) ||
      DomainException.throw('Name is required', 'Category.name', 'Validation')
    validatorService.stringValidator.validate_type(name) ||
      DomainException.throw('Name is invalid', 'Category.name', 'Validation')
    validatorService.stringValidator.validate_min_length(name, 3) ||
      DomainException.throw('Name must have at least 3 characters', 'Category.name', 'Validation')
    validatorService.stringValidator.validate_max_length(name, 100) ||
      DomainException.throw('Name must have at most 100 characters', 'Category.name', 'Validation')

    validatorService.fixedValueValidator.validate_required(type) ||
      DomainException.throw('Type is required', 'Category.type', 'Validation')
    validatorService.fixedValueValidator.validate_exists(type, CategoryTypes) ||
      DomainException.throw('Type is invalid', 'Category.type', 'Validation')

    return new Category(uuid, createdAt, updatedAt, name, type)
  }
}
