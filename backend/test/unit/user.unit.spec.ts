import { Repository } from 'typeorm'
import { UserService } from '../../src/app/services/user.service'
import { User } from '../../src/domain/entities/user.entity'
import { Exception } from '../../src/domain/exception/exception'
import { UserRepository } from '../../src/infrastructure/database/user.repository'
import { HashService } from '../../src/infrastructure/services/hash.service'
import { UuidService } from '../../src/infrastructure/services/uuid.service'
import { UserDatabaseEntity } from '../../src/infrastructure/database/models/user.orm.entity'

jest.mock('../../src/infrastructure/services/uuid.service.ts')
jest.mock('../../src/infrastructure/services/hash.service.ts')
jest.mock('../../src/infrastructure/database/user.repository.ts')

let uuidService: UuidService
let hashService: HashService
let userRepository: UserRepository
let userService: UserService

beforeEach(() => {
  uuidService = new UuidService()
  hashService = new HashService()
  userRepository = new UserRepository({} as Repository<UserDatabaseEntity>)
  userService = new UserService(uuidService, hashService, userRepository)
})

describe('[Unit - UserService] Create a new user', () => {
  it('Should create a valid user', async () => {
    const user = await userService.create('New User', 'newuser@gmail.com', 'Password123*')

    expect(user.getUuid()).toBe('6d6a9b03-8a3c-4d39-8119-f9cf8a9fd742')
    expect(user.getCreatedAt()).toBeInstanceOf(Date)
    expect(user.getUpdatedAt()).toBeInstanceOf(Date)
    expect(user.getName()).toBe('New User')
    expect(user.getEmail()).toBe('newuser@gmail.com')
    expect(user.getHash()).toBe('$2a$12$m5dmJ8jW6Lr/nAUbQn/MsegCCdHnrYJhG.HccW0l5t3EOmPrHZxVW')
    expect(user instanceof User).toBe(true)
  })

  it('Should throw an error when user with email already exists', async () => {
    try {
      await userService.create('New User', 'user1@email.com', 'Password123*')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Verification')
      expect(error.origin).toBe('ApplicationService.UserService.create')
      expect(error.message).toBe('User with email already exists')
    }
  })

  it('Should throw an error when name is empty', async () => {
    try {
      await userService.create('', 'newuser@email.com', 'Password123*')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.name')
      expect(error.message).toBe('Name is required')
    }
  })

  it('Should throw an error when name is empty', async () => {
    try {
      await userService.create('', 'newuser@email.com', 'Password123*')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.name')
      expect(error.message).toBe('Name is required')
    }
  })

  it('Should throw an error when name is less than 3 characters', async () => {
    try {
      await userService.create('Ne', 'newuser@email.com', 'Password123*')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.name')
      expect(error.message).toBe('Name must have at least 3 characters')
    }
  })

  it('Should throw an error when name is more than 100 characters', async () => {
    try {
      await userService.create(
        'NewUserNewUserNewUserNewUserNewUserNewUserNewUserNewUserNewUserNewUserNewUserNewUserNewUserNewUserNew',
        'newuser@email.com',
        'Password123*'
      )
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.name')
      expect(error.message).toBe('Name must have at most 100 characters')
    }
  })

  it('Should throw an error when email is empty', async () => {
    try {
      await userService.create('New User', '', 'Password123*')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.email')
      expect(error.message).toBe('Email is required')
    }
  })

  it('Should throw an error when email is invalid', async () => {
    try {
      await userService.create('New User', 'newuser@@email.com', 'Password123*')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.email')
      expect(error.message).toBe('Email is invalid')
    }
  })

  it('Should throw an error when email is more than 320 characters', async () => {
    try {
      await userService.create(
        'New User',
        'newusernewusernewusnewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernnewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernewusewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernewusernewuser@email.com',
        'Password123*'
      )
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.email')
      expect(error.message).toBe('Email must have at most 320 characters')
    }
  })

  it('Should throw an error when password is empty', async () => {
    try {
      await userService.create('New User', 'newuser@email.com', '')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.password')
      expect(error.message).toBe('Password is required')
    }
  })

  it('Should throw an error when password is less than 10 characters', async () => {
    try {
      await userService.create('New User', 'newuser@email.com', 'Pass123*')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.password')
      expect(error.message).toBe('Password must have at least 10 characters')
    }
  })

  it('Should throw an error when password is empty', async () => {
    try {
      await userService.create(
        'New User',
        'newuser@email.com',
        'Password123*Password123*Password123*Password123*Password123*Password123*Password123*Password123*Password123*'
      )
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.password')
      expect(error.message).toBe('Password must have at most 100 characters')
    }
  })

  it('Should throw an error when password does not have at least 1 lowercase character', async () => {
    try {
      await userService.create('New User', 'newuser@email.com', 'PASSWORD123*')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.password')
      expect(error.message).toBe('Password must have at least 1 lowercase character')
    }
  })

  it('Should throw an error when password does not have at least 1 uppercase character', async () => {
    try {
      await userService.create('New User', 'newuser@email.com', 'password123*')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.password')
      expect(error.message).toBe('Password must have at least 1 uppercase character')
    }
  })

  it('Should throw an error when password does not have at least 1 number', async () => {
    try {
      await userService.create('New User', 'newuser@email.com', 'Passwordadmin*')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.password')
      expect(error.message).toBe('Password must have at least 1 number')
    }
  })

  it('Should throw an error when password does not have at least 1 special character', async () => {
    try {
      await userService.create('New User', 'newuser@email.com', 'Password123')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Validation')
      expect(error.origin).toBe('DomainEntity.User.password')
      expect(error.message).toBe('Password must have at least 1 special character')
    }
  })
})

describe('[Unit - UserService] Verify user credentials', () => {
  it('Should verify correct user credentials', async () => {
    const user = (await userService.verifyCredentials('user1@email.com', 'Password123*')) as User

    expect(user.getUuid()).toBe('cde4d425-c343-4a3d-bb0e-266f9331f165')
    expect(user.getCreatedAt()).toBeInstanceOf(Date)
    expect(user.getUpdatedAt()).toBeInstanceOf(Date)
    expect(user.getName()).toBe('User 1')
    expect(user.getEmail()).toBe('user1@email.com')
    expect(user instanceof User).toBe(true)
  })

  it('Should throw an error when user is not found', async () => {
    try {
      await userService.verifyCredentials('notfound@email.com', 'Password123*')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('NotFound')
      expect(error.origin).toBe('ApplicationService.UserService.verifyCredentials')
      expect(error.message).toBe('User not found')
    }
  })

  it('Should throw an error when password is invalid', async () => {
    try {
      await userService.verifyCredentials('user1@email.com', 'PasswordInvalid123*')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('Verification')
      expect(error.origin).toBe('ApplicationService.UserService.verifyCredentials')
      expect(error.message).toBe('Password is incorrect')
    }
  })
})

describe('[Unit - UserService] Find user', () => {
  it('Should find a user by uuid', async () => {
    const uuid = 'cde4d425-c343-4a3d-bb0e-266f9331f165'

    const user = (await userService.find(uuid)) as User

    expect(user instanceof User).toBe(true)
    expect(user.getUuid()).toBe(uuid)
    expect(user.getCreatedAt()).toBeInstanceOf(Date)
    expect(user.getUpdatedAt()).toBeInstanceOf(Date)
    expect(user.getName()).toBe('User 1')
    expect(user.getEmail()).toBe('user1@email.com')
  })

  it('Should throw an error when user was not found', async () => {
    try {
      await userService.find('invalid-uuid')
    } catch (error) {
      expect(error instanceof Exception).toBe(true)
      expect(error.reason).toBe('NotFound')
      expect(error.origin).toBe('ApplicationService.UserService.find')
      expect(error.message).toBe('User was not found')
    }
  })
})
