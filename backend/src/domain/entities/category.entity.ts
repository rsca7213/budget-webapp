import { Entity } from '../interface/entity.abstract'
import { Exception } from '../exception/exception'
import { CategoryType, CategoryTypes } from '../types/category.types'

export class Category extends Entity {
  private name: string
  private type: CategoryType

  private constructor() {
    super()
  }

  public getName(): string {
    return this.name
  }

  public getType(): CategoryType {
    return this.type
  }

  public setName(name: string): void {
    this.validatorService.stringValidator.validate_required(name) ||
      Exception.throw('Name is required', 'DomainEntity.Category.name', 'Validation')
    this.validatorService.stringValidator.validate_type(name) ||
      Exception.throw('Name is invalid', 'DomainEntity.Category.name', 'Validation')
    this.validatorService.stringValidator.validate_min_length(name, 3) ||
      Exception.throw('Name must have at least 3 characters', 'DomainEntity.Category.name', 'Validation')
    this.validatorService.stringValidator.validate_max_length(name, 100) ||
      Exception.throw('Name must have at most 100 characters', 'DomainEntity.Category.name', 'Validation')

    this.name = name
  }

  public setType(type: CategoryType): void {
    this.validatorService.fixedValueValidator.validate_required(type) ||
      Exception.throw('Type is required', 'DomainEntity.Category.type', 'Validation')
    this.validatorService.fixedValueValidator.validate_exists(type, CategoryTypes) ||
      Exception.throw('Type is invalid', 'DomainEntity.Category.type', 'Validation')

    this.type = type
  }

  public static create(uuid: string, name: string, type: CategoryType): Category {
    const category = new Category()

    category.setUuid(uuid)
    category.setName(name)
    category.setType(type)
    category.setCreatedAt(new Date())
    category.setUpdatedAt(new Date())

    return category
  }
}
