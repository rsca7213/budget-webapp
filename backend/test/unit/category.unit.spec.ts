import { CategoryService } from '../../src/app/services/category.service'
import { Category } from '../../src/domain/entities/category.entity'
import { DomainException } from '../../src/domain/exception/exception'
import { BootstrapServerService } from '../../src/infrastructure/shared/services/bootstrap-server.service'
import { UuidService } from '../../src/infrastructure/shared/services/uuid.service'

jest.mock('../../src/infrastructure/shared/services/uuid.service.ts')

let uuidService: UuidService
let categoryService: CategoryService

beforeAll(() => {
  new BootstrapServerService().startDomainValidationService(false)
  uuidService = new UuidService()
  categoryService = new CategoryService(uuidService)
})

describe('[Unit - CategoryService] Create a new category', () => {
  it('Should create a valid category', () => {
    const category = categoryService.create('Groceries', 'Income')

    expect(category.getUuid()).toBe('6d6a9b03-8a3c-4d39-8119-f9cf8a9fd742')
    expect(category.getName()).toBe('Groceries')
    expect(category.getType()).toBe('Income')
    expect(category instanceof Category).toBe(true)
  })

  it('Should throw an error when name is empty', () => {
    try {
      categoryService.create('', 'Income')
    } catch (error) {
      expect(error instanceof DomainException).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('Category.name')
      expect(error.message).toBe('Name is required')
    }
  })

  it('Should throw an error when name is less than 3 characters', () => {
    try {
      categoryService.create('Ca', 'Income')
    } catch (error) {
      expect(error instanceof DomainException).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('Category.name')
      expect(error.message).toBe('Name must have at least 3 characters')
    }
  })

  it('Should throw an error when name is more than 100 characters', () => {
    try {
      categoryService.create(
        'CategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategory',
        'Income'
      )
    } catch (error) {
      expect(error instanceof DomainException).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('Category.name')
      expect(error.message).toBe('Name must have at most 100 characters')
    }
  })

  it('Should throw an error when type is empty', () => {
    try {
      categoryService.create('Groceries', '' as any)
    } catch (error) {
      expect(error instanceof DomainException).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('Category.type')
      expect(error.message).toBe('Type is required')
    }
  })

  it('Should throw an error when type is invalid', () => {
    try {
      categoryService.create('Groceries', 'InvalidType' as any)
    } catch (error) {
      expect(error instanceof DomainException).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('Category.type')
      expect(error.message).toBe('Type is invalid')
    }
  })
})
