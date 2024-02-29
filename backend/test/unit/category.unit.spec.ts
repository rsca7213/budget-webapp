import { CategoryService } from '../../src/app/services/category.service'
import { Category } from '../../src/domain/entities/category.entity'
import { Exception } from '../../src/domain/exception/exception'
import { CategoryRepository } from '../../src/infrastructure/database/category.repository'
import { BootstrapServerService } from '../../src/infrastructure/services/bootstrap-server.service'
import { UuidService } from '../../src/infrastructure/services/uuid.service'

jest.mock('../../src/infrastructure/services/uuid.service.ts')
jest.mock('../../src/infrastructure/database/category.repository.ts')

let uuidService: UuidService
let categoryService: CategoryService
let categoryRepository: CategoryRepository

beforeAll(() => {
  new BootstrapServerService().startDomainValidationService(false)
  uuidService = new UuidService()
  categoryRepository = new CategoryRepository()
  categoryService = new CategoryService(uuidService, categoryRepository)
})

describe('[Unit - CategoryService] Find a category', () => {
  it('Should find a category by uuid', async () => {
    const uuid = 'cde4d425-c343-4a3d-bb0e-266f9331f165'

    const category = (await categoryService.find(uuid)) as Category

    expect(category instanceof Category).toBe(true)
    expect(category.getUuid()).toBe(uuid)
    expect(category.getCreatedAt()).toBeInstanceOf(Date)
    expect(category.getUpdatedAt()).toBeInstanceOf(Date)
    expect(category.getName()).toBe('Category 1')
    expect(category.getType()).toBe('Income')
  })

  it('Should throw an error when category was not found', async () => {
    try {
      await categoryService.find('invalid-uuid')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Not Found')
      expect(error.origin).toBe('ApplicationService.Category.find')
      expect(error.message).toBe('Category was not found')
    }
  })
})

describe('[Unit - CategoryService] Find all categories', () => {
  it('Should find all categories', async () => {
    const categories = await categoryService.findAll()

    expect(categories.length).toBe(6)
    expect(categories.map(category => category instanceof Category).every(instance => instance)).toBe(true)
  })
})

describe('[Unit - CategoryService] Create a new category', () => {
  it('Should create a valid category', async () => {
    const category = await categoryService.create('Groceries', 'Income')

    expect(category.getUuid()).toBe('6d6a9b03-8a3c-4d39-8119-f9cf8a9fd742')
    expect(category.getCreatedAt()).toBeInstanceOf(Date)
    expect(category.getUpdatedAt()).toBeInstanceOf(Date)
    expect(category.getName()).toBe('Groceries')
    expect(category.getType()).toBe('Income')
    expect(category instanceof Category).toBe(true)
  })

  it('Should throw an error when name is empty', async () => {
    try {
      await categoryService.create('', 'Income')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.name')
      expect(error.message).toBe('Name is required')
    }
  })

  it('Should throw an error when name is less than 3 characters', async () => {
    try {
      await categoryService.create('Ca', 'Income')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.name')
      expect(error.message).toBe('Name must have at least 3 characters')
    }
  })

  it('Should throw an error when name is more than 100 characters', async () => {
    try {
      await categoryService.create(
        'CategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategory',
        'Income'
      )
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.name')
      expect(error.message).toBe('Name must have at most 100 characters')
    }
  })

  it('Should throw an error when type is empty', async () => {
    try {
      await categoryService.create('Groceries', '' as any)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.type')
      expect(error.message).toBe('Type is required')
    }
  })

  it('Should throw an error when type is invalid', async () => {
    try {
      await categoryService.create('Groceries', 'InvalidType' as any)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.type')
      expect(error.message).toBe('Type is invalid')
    }
  })
})
