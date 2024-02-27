import { IValidator } from '../abstract/validator.interface'

export interface IFixedValuesValidator extends IValidator<string> {
  validate_exists(value: string, fixed_values: string[]): boolean
}
