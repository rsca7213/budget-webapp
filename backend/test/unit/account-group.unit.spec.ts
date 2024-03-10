import { Repository } from 'typeorm'
import { AccountGroupService } from '../../src/app/services/account-group.service'
import { AccountGroupRepository } from '../../src/infrastructure/database/account-group.repository'
import { UuidService } from '../../src/infrastructure/services/uuid.service'
import { AccountGroupDatabaseEntity } from '../../src/infrastructure/database/models/account-group.orm.entity'
import { UserDatabaseEntity } from '../../src/infrastructure/database/models/user.orm.entity'
import { AccountGroup } from '../../src/domain/entities/account-group.entity'
import { Exception } from '../../src/domain/exception/exception'
import { AccountType } from '../../src/domain/types/account.types'

jest.mock('../../src/infrastructure/database/account-group.repository')
jest.mock('../../src/infrastructure/services/uuid.service')

let uuidService: UuidService
let accountGroupRepository: AccountGroupRepository
let accountGroupService: AccountGroupService

const userUuid = 'cde4d425-c343-4a3d-bb0e-266f9331f171'

beforeEach(() => {
  uuidService = new UuidService()
  accountGroupRepository = new AccountGroupRepository(
    {} as Repository<AccountGroupDatabaseEntity>,
    {} as Repository<UserDatabaseEntity>
  )
  accountGroupService = new AccountGroupService(uuidService, accountGroupRepository)
})

describe('[Unit - AccountGroupService] Find all account groups', () => {
  it('Should find all account groups', async () => {
    const accountGroups = await accountGroupService.findAll(userUuid)

    expect(accountGroups).toHaveLength(3)
    expect(accountGroups.every(accountGroup => accountGroup instanceof AccountGroup)).toBe(true)
  })
})

describe('[Unit - AccountGroupService] Create an account group', () => {
  it('Should create a valid account group', async () => {
    const accountGroup = await accountGroupService.create('Debts', 'Income', userUuid)

    expect(accountGroup.getUuid()).toBe('6d6a9b03-8a3c-4d39-8119-f9cf8a9fd742')
    expect(accountGroup.getName()).toBe('Debts')
    expect(accountGroup.getType()).toBe('Income')
    expect(accountGroup.getCreatedAt()).toBeInstanceOf(Date)
    expect(accountGroup.getUpdatedAt()).toBeInstanceOf(Date)
    expect(accountGroup).toBeInstanceOf(AccountGroup)
  })

  it('Should throw an error when another account group exists by name', async () => {
    try {
      await accountGroupService.create('Banks', 'Income', userUuid)
    } catch (error) {
      expect(error).toBeInstanceOf(Exception)
      expect(error.reason).toBe('Verification')
      expect(error.origin).toBe('ApplicationService.AccountGroup.create')
      expect(error.message).toBe('Account group named Banks already exists')
    }
  })

  it('Should throw an error when name is empty', async () => {
    try {
      await accountGroupService.create('', 'Income', userUuid)
    } catch (error) {
      expect(error).toBeInstanceOf(Exception)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.AccountGroup.name')
      expect(error.message).toBe('Name is required')
    }
  })

  it('Should throw an error when name is less than 3 characters', async () => {
    try {
      await accountGroupService.create('Ba', 'Income', userUuid)
    } catch (error) {
      expect(error).toBeInstanceOf(Exception)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.AccountGroup.name')
      expect(error.message).toBe('Name must be at least 3 characters')
    }
  })

  it('Should throw an error when name is more than 50 characters', async () => {
    try {
      await accountGroupService.create('a'.repeat(51), 'Income', userUuid)
    } catch (error) {
      expect(error).toBeInstanceOf(Exception)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.AccountGroup.name')
      expect(error.message).toBe('Name must be at most 50 characters')
    }
  })

  it('Should throw an error when type is empty', async () => {
    try {
      await accountGroupService.create('Banks', '' as AccountType, userUuid)
    } catch (error) {
      expect(error).toBeInstanceOf(Exception)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.AccountGroup.type')
      expect(error.message).toBe('Type is required')
    }
  })

  it('Should throw an error when type is invalid', async () => {
    try {
      await accountGroupService.create('Banks', 'Invalid' as AccountType, userUuid)
    } catch (error) {
      expect(error).toBeInstanceOf(Exception)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.AccountGroup.type')
      expect(error.message).toBe('Type is invalid')
    }
  })
})
