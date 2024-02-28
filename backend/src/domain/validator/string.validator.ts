import { IValidator } from '../interface/validator.interface'

export interface IStringValidator extends IValidator<string> {
  validateType(value: string): boolean
  validateMinLength(value: string, minLength: number): boolean
  validateMaxLength(value: string, maxLength: number): boolean
}
