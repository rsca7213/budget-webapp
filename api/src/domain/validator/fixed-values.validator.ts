import { IValidator } from '../interface/validator.interface'

export interface IFixedValuesValidator extends IValidator<string> {
  validateExists(value: string, fixedValues: string[]): boolean
}
