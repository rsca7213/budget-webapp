import { Entity } from '../interface/entity.abstract'
import { Exception } from '../exception/exception'
import { CategoryType, categoryTypes } from '../types/category.types'

export class Category extends Entity {
  private name: string
  private type: CategoryType

  private constructor() {
    super()
  }

  public static restore(
    uuid: string,
    name: string,
    type: CategoryType,
    createdAt: Date,
    updatedAt: Date
  ): Category {
    const category = new Category()

    category.setUuid(uuid)
    category.setName(name)
    category.setType(type)
    category.setCreatedAt(createdAt)
    category.setUpdatedAt(updatedAt)

    return category
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

  public getName(): string {
    return this.name
  }

  public getType(): CategoryType {
    return this.type
  }

  public setName(name: string): void {
    this.validatorService.stringValidator.validateRequired(name) ||
      Exception.throw('Name is required', 'DomainEntity.Category.name', 'Validation')
    this.validatorService.stringValidator.validateType(name) ||
      Exception.throw('Name is invalid', 'DomainEntity.Category.name', 'Validation')
    this.validatorService.stringValidator.validateMinLength(name, 3) ||
      Exception.throw(
        'Name must have at least 3 characters',
        'DomainEntity.Category.name',
        'Validation'
      )
    this.validatorService.stringValidator.validateMaxLength(name, 50) ||
      Exception.throw(
        'Name must have at most 50 characters',
        'DomainEntity.Category.name',
        'Validation'
      )

    this.name = name
    this.setUpdatedAt(new Date())
  }

  public setType(type: CategoryType): void {
    this.validatorService.fixedValueValidator.validateRequired(type) ||
      Exception.throw('Type is required', 'DomainEntity.Category.type', 'Validation')
    this.validatorService.fixedValueValidator.validateExists(type, categoryTypes) ||
      Exception.throw('Type is invalid', 'DomainEntity.Category.type', 'Validation')

    this.type = type
    this.setUpdatedAt(new Date())
  }
}
