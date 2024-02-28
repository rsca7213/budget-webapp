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
    const validate_required = <T>(value: T): boolean => {
      if (value === undefined || value === null || value === '') return false
      return true
    }

    const booleanValidator: IBooleanValidator = {
      validate_required,
      validate_type: (value: boolean): boolean => {
        return typeof value === 'boolean'
      }
    }

    const uuidValidator: IUuidValidator = {
      validate_required,
      validate: (value: string): boolean =>
        value.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/) !== null
    }

    const stringValidator: IStringValidator = {
      validate_required,
      validate_type: (value: string): boolean => typeof value === 'string',
      validate_min_length: (value: string, min_length: number): boolean => value.length >= min_length,
      validate_max_length: (value: string, max_length: number): boolean => value.length <= max_length
    }

    const numberValidator: INumberValidator = {
      validate_required,
      validate_type: (value: number): boolean => typeof value === 'number' && !isNaN(value),
      validate_min: (value: number, min: number): boolean => value >= min,
      validate_max: (value: number, max: number): boolean => value <= max
    }

    const dateValidator: IDateValidator = {
      validate_required,
      validate_type: (value: Date): boolean => value instanceof Date,
      validate_non_future: (value: Date): boolean => value.getTime() <= new Date().getTime(),
      validate_non_past: (value: Date): boolean => value.getTime() >= new Date().getTime()
    }

    const fixedValueValidator: IFixedValuesValidator = {
      validate_required,
      validate_exists: (value: string, fixed_values: string[]): boolean => fixed_values.includes(value)
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
