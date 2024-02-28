import { IBooleanValidator } from '../validator/boolean.validator'
import { IDateValidator } from '../validator/date.validator'
import { IFixedValuesValidator } from '../validator/fixed-values.validator'
import { INumberValidator } from '../validator/number.validator'
import { IStringValidator } from '../validator/string.validator'
import { IUuidValidator } from '../validator/uuid.validator'

export class DomainValidatorService {
  private static instance: DomainValidatorService

  private constructor(
    public readonly booleanValidator: IBooleanValidator,
    public readonly uuidValidator: IUuidValidator,
    public readonly stringValidator: IStringValidator,
    public readonly numberValidator: INumberValidator,
    public readonly dateValidator: IDateValidator,
    public readonly fixedValueValidator: IFixedValuesValidator
  ) {}

  public static generateInstance(): void {
    const validateRequired = <T>(value: T): boolean => {
      if (value === undefined || value === null || value === '') return false
      return true
    }

    const booleanValidator: IBooleanValidator = {
      validateRequired,
      validateType: (value: boolean): boolean => {
        return typeof value === 'boolean'
      }
    }

    const uuidValidator: IUuidValidator = {
      validateRequired,
      validate: (value: string): boolean =>
        value.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/) !== null
    }

    const stringValidator: IStringValidator = {
      validateRequired,
      validateType: (value: string): boolean => typeof value === 'string',
      validateMinLength: (value: string, minLength: number): boolean => value.length >= minLength,
      validateMaxLength: (value: string, maxLength: number): boolean => value.length <= maxLength,
      validateRegex: (value: string, regex: 'email'): boolean => {
        switch (regex) {
          case 'email':
            return value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) !== null
          default:
            return false
        }
      },
      validateHasLowercase: (value: string): boolean => value.match(/[a-z]/) !== null,
      validateHasUppercase: (value: string): boolean => value.match(/[A-Z]/) !== null,
      validateHasNumber: (value: string): boolean => value.match(/[0-9]/) !== null,
      validateHasSpecialCharacter: (value: string): boolean => value.match(/[^a-zA-Z0-9]/) !== null
    }

    const numberValidator: INumberValidator = {
      validateRequired,
      validateType: (value: number): boolean => typeof value === 'number' && !isNaN(value),
      validateMin: (value: number, min: number): boolean => value >= min,
      validateMax: (value: number, max: number): boolean => value <= max
    }

    const dateValidator: IDateValidator = {
      validateRequired,
      validateType: (value: Date): boolean => value instanceof Date,
      validateNonFuture: (value: Date): boolean => value.getTime() <= new Date().getTime(),
      validateNonPast: (value: Date): boolean => value.getTime() >= new Date().getTime()
    }

    const fixedValueValidator: IFixedValuesValidator = {
      validateRequired,
      validateExists: (value: string, fixedValues: string[]): boolean => fixedValues.includes(value)
    }

    DomainValidatorService.instance = new DomainValidatorService(
      booleanValidator,
      uuidValidator,
      stringValidator,
      numberValidator,
      dateValidator,
      fixedValueValidator
    )
  }

  public static getInstance(): DomainValidatorService {
    return DomainValidatorService.instance
  }
}
