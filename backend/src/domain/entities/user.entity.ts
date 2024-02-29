import { Exception } from '../exception/exception'
import { Entity } from '../interface/entity.abstract'

export class User extends Entity {
  private name: string
  private email: string
  private passwordHash: string

  private constructor() {
    super()
  }

  public getName(): string {
    return this.name
  }

  public getEmail(): string {
    return this.email
  }

  public getHash(): string {
    return this.passwordHash
  }

  public setName(name: string): void {
    this.validatorService.stringValidator.validateRequired(name) ||
      Exception.throw('Name is required', 'DomainEntity.User.name', 'Validation')
    this.validatorService.stringValidator.validateType(name) ||
      Exception.throw('Name is invalid', 'DomainEntity.User.name', 'Validation')
    this.validatorService.stringValidator.validateMinLength(name, 3) ||
      Exception.throw('Name must have at least 3 characters', 'DomainEntity.User.name', 'Validation')
    this.validatorService.stringValidator.validateMaxLength(name, 100) ||
      Exception.throw('Name must have at most 100 characters', 'DomainEntity.User.name', 'Validation')

    this.name = name
  }

  public setEmail(email: string): void {
    this.validatorService.stringValidator.validateRequired(email) ||
      Exception.throw('Email is required', 'DomainEntity.User.email', 'Validation')
    this.validatorService.stringValidator.validateType(email) ||
      Exception.throw('Email is invalid', 'DomainEntity.User.email', 'Validation')
    this.validatorService.stringValidator.validateMaxLength(email, 320) ||
      Exception.throw('Email must have at most 320 characters', 'DomainEntity.User.email', 'Validation')
    this.validatorService.stringValidator.validateRegex(email, 'email') ||
      Exception.throw('Email is invalid', 'DomainEntity.User.email', 'Validation')

    this.email = email
  }

  public validatePasswordValue(password: string): void {
    this.validatorService.stringValidator.validateRequired(password) ||
      Exception.throw('Password is required', 'DomainEntity.User.password', 'Validation')
    this.validatorService.stringValidator.validateType(password) ||
      Exception.throw('Password is invalid', 'DomainEntity.User.password', 'Validation')
    this.validatorService.stringValidator.validateMinLength(password, 10) ||
      Exception.throw('Password must have at least 10 characters', 'DomainEntity.User.password', 'Validation')
    this.validatorService.stringValidator.validateMaxLength(password, 100) ||
      Exception.throw('Password must have at most 100 characters', 'DomainEntity.User.password', 'Validation')
    this.validatorService.stringValidator.validateHasLowercase(password) ||
      Exception.throw('Password must have at least 1 lowercase character', 'DomainEntity.User.password', 'Validation')
    this.validatorService.stringValidator.validateHasUppercase(password) ||
      Exception.throw('Password must have at least 1 uppercase character', 'DomainEntity.User.password', 'Validation')
    this.validatorService.stringValidator.validateHasNumber(password) ||
      Exception.throw('Password must have at least 1 number', 'DomainEntity.User.password', 'Validation')
    this.validatorService.stringValidator.validateHasSpecialCharacter(password) ||
      Exception.throw('Password must have at least 1 special character', 'DomainEntity.User.password', 'Validation')
  }

  public setPasswordHash(hash: string): void {
    this.validatorService.stringValidator.validateRequired(hash) ||
      Exception.throw('Password hash is required', 'DomainEntity.User.password', 'Validation')
    this.validatorService.stringValidator.validateType(hash) ||
      Exception.throw('Password hash is invalid', 'DomainEntity.User.password', 'Validation')

    this.passwordHash = hash
  }

  public static create(uuid: string, name: string, email: string, hash: string): User {
    const user = new User()

    user.setUuid(uuid)
    user.setName(name)
    user.setEmail(email)
    user.setPasswordHash(hash)
    user.setCreatedAt(new Date())
    user.setUpdatedAt(new Date())

    return user
  }
}
