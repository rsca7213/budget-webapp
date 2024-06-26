import { Repository } from 'typeorm'
import { CategoryService } from '../../src/app/services/category.service'
import { Category } from '../../src/domain/entities/category.entity'
import { Exception } from '../../src/domain/exception/exception'
import { CategoryRepository } from '../../src/infrastructure/database/category.repository'
import { UuidService } from '../../src/infrastructure/services/uuid.service'
import { CategoryDatabaseEntity } from '../../src/infrastructure/database/models/category.orm.entity'
import { UserDatabaseEntity } from '../../src/infrastructure/database/models/user.orm.entity'
import { CategoryType } from '../../src/domain/types/category.types'

jest.mock('../../src/infrastructure/services/uuid.service.ts')
jest.mock('../../src/infrastructure/database/category.repository.ts')

let uuidService: UuidService
let categoryService: CategoryService
let categoryRepository: CategoryRepository

const userUuid = 'cde4d425-c343-4a3d-bb0e-266f9331f171'
const secondaryUserUuid = 'cde4d425-c343-4a3d-bb0e-266f9331f172'

beforeEach(() => {
  uuidService = new UuidService()
  categoryRepository = new CategoryRepository(
    {} as Repository<CategoryDatabaseEntity>,
    {} as Repository<UserDatabaseEntity>
  )
  categoryService = new CategoryService(uuidService, categoryRepository)
})

describe('[Unit - CategoryService] Find a category', () => {
  it('Should find a category by uuid', async () => {
    const uuid = 'cde4d425-c343-4a3d-bb0e-266f9331f165'

    const category = (await categoryService.find(uuid, userUuid)) as Category

    expect(category instanceof Category).toBe(true)
    expect(category.getUuid()).toBe(uuid)
    expect(category.getCreatedAt()).toBeInstanceOf(Date)
    expect(category.getUpdatedAt()).toBeInstanceOf(Date)
    expect(category.getName()).toBe('Category 1')
    expect(category.getType()).toBe('Income')
  })

  it('Should throw an error when category was not found', async () => {
    try {
      await categoryService.find('invalid-uuid', userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('NotFound')
      expect(error.origin).toBe('ApplicationService.Category.find')
      expect(error.message).toBe('Category was not found')
    }
  })

  it('Should throw an error when category is not from the user', async () => {
    try {
      await categoryService.find('cde4d425-c343-4a3d-bb0e-266f9331f166', userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('NotFound')
      expect(error.origin).toBe('ApplicationService.Category.find')
      expect(error.message).toBe('Category was not found')
    }
  })
})

describe('[Unit - CategoryService] Find all categories', () => {
  it('Should find all categories', async () => {
    const categories = await categoryService.findAll(userUuid)

    expect(categories.length).toBe(6)
    expect(
      categories.map(category => category instanceof Category).every(instance => instance)
    ).toBe(true)
  })
})

describe('[Unit - CategoryService] Create a new category', () => {
  it('Should create a valid category', async () => {
    const category = await categoryService.create('Groceries', 'Income', userUuid)

    expect(category.getUuid()).toBe('6d6a9b03-8a3c-4d39-8119-f9cf8a9fd742')
    expect(category.getCreatedAt()).toBeInstanceOf(Date)
    expect(category.getUpdatedAt()).toBeInstanceOf(Date)
    expect(category.getName()).toBe('Groceries')
    expect(category.getType()).toBe('Income')
    expect(category instanceof Category).toBe(true)
  })

  it('Should throw an error when name is empty', async () => {
    try {
      await categoryService.create('', 'Income', userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.name')
      expect(error.message).toBe('Name is required')
    }
  })

  it('Should throw an error when name is less than 3 characters', async () => {
    try {
      await categoryService.create('Ca', 'Income', userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.name')
      expect(error.message).toBe('Name must have at least 3 characters')
    }
  })

  it('Should throw an error when name is more than 50 characters', async () => {
    try {
      await categoryService.create(
        'CategoryCategoryCategoryCategoryCategoryCategoryCategoryCategory',
        'Income',
        userUuid
      )
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.name')
      expect(error.message).toBe('Name must have at most 50 characters')
    }
  })

  it('Should throw an error when type is empty', async () => {
    try {
      await categoryService.create('Groceries', '' as CategoryType, userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.type')
      expect(error.message).toBe('Type is required')
    }
  })

  it('Should throw an error when type is invalid', async () => {
    try {
      await categoryService.create('Groceries', 'InvalidType' as CategoryType, userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.type')
      expect(error.message).toBe('Type is invalid')
    }
  })
})

describe('[Unit - CategoryService] Update a category', () => {
  it('Should update a category', async () => {
    const category = await categoryService.update(
      'cde4d425-c343-4a3d-bb0e-266f9331f165',
      'Groceries',
      'Income',
      userUuid
    )

    expect(category instanceof Category).toBe(true)
    if (!category) return

    expect(category.getUuid()).toBe('cde4d425-c343-4a3d-bb0e-266f9331f165')
    expect(category.getCreatedAt()).toBeInstanceOf(Date)
    expect(category.getUpdatedAt()).toBeInstanceOf(Date)
    expect(category.getName()).toBe('Groceries')
    expect(category.getType()).toBe('Income')
  })

  it('Should throw an error when category was not found', async () => {
    try {
      await categoryService.update(
        'cffd5c9b-294a-475b-95f0-e31a946ac6b3',
        'Groceries',
        'Income',
        userUuid
      )
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('NotFound')
      expect(error.origin).toBe('ApplicationService.Category.update')
      expect(error.message).toBe('Category was not found')
    }
  })

  it('Should throw an error when name is empty', async () => {
    try {
      await categoryService.update('cde4d425-c343-4a3d-bb0e-266f9331f165', '', 'Income', userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.name')
      expect(error.message).toBe('Name is required')
    }
  })

  it('Should throw an error when name is less than 3 characters', async () => {
    try {
      await categoryService.update('cde4d425-c343-4a3d-bb0e-266f9331f165', 'Ca', 'Income', userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.name')
      expect(error.message).toBe('Name must have at least 3 characters')
    }
  })

  it('Should throw an error when name is more than 50 characters', async () => {
    try {
      await categoryService.update(
        'cde4d425-c343-4a3d-bb0e-266f9331f165',
        'CategoryCategoryCategoryCategoryCategoryCategoryCategoryCategoryCategory',
        'Income',
        userUuid
      )
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.name')
      expect(error.message).toBe('Name must have at most 50 characters')
    }
  })

  it('Should throw an error when type is empty', async () => {
    try {
      await categoryService.update(
        'cde4d425-c343-4a3d-bb0e-266f9331f165',
        'Groceries',
        '' as CategoryType,
        userUuid
      )
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.type')
      expect(error.message).toBe('Type is required')
    }
  })

  it('Should throw an error when type is invalid', async () => {
    try {
      await categoryService.update(
        'cde4d425-c343-4a3d-bb0e-266f9331f165',
        'Groceries',
        'InvalidType' as CategoryType,
        userUuid
      )
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.Category.type')
      expect(error.message).toBe('Type is invalid')
    }
  })

  it('Should throw an error when category is not from the user', async () => {
    try {
      await categoryService.update(
        'cde4d425-c343-4a3d-bb0e-266f9331f166',
        'Groceries',
        'Income',
        userUuid
      )
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('NotFound')
      expect(error.origin).toBe('ApplicationService.Category.update')
      expect(error.message).toBe('Category was not found')
    }
  })
})

describe('[Unit - CategoryService] Delete a category', () => {
  it('Should delete a category', async () => {
    await categoryService.delete('cde4d425-c343-4a3d-bb0e-266f9331f165', userUuid)

    const categories = await categoryService.findAll(userUuid)
    expect(categories.length).toBe(5)
  })

  it('Should throw an error when category was not found', async () => {
    try {
      await categoryService.delete('cffd5c9b-294a-475b-95f0-e31a946ac6b3', userUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('NotFound')
      expect(error.origin).toBe('ApplicationService.Category.delete')
      expect(error.message).toBe('Category was not found')
    }
  })

  it('Should throw an error when category is not from the user', async () => {
    try {
      await categoryService.delete('cde4d425-c343-4a3d-bb0e-266f9331f166', secondaryUserUuid)
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('NotFound')
      expect(error.origin).toBe('ApplicationService.Category.delete')
      expect(error.message).toBe('Category was not found')
    }
  })
})
