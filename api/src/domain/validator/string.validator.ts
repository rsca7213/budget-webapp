import { IValidator } from '../interface/validator.interface'

export interface IStringValidator extends IValidator<string> {
  validateType(value: string): boolean
  validateMinLength(value: string, minLength: number): boolean
  validateMaxLength(value: string, maxLength: number): boolean
  validateRegex(value: string, regex: 'email'): boolean
  validateHasNumber(value: string): boolean
  validateHasUppercase(value: string): boolean
  validateHasLowercase(value: string): boolean
  validateHasSpecialCharacter(value: string): boolean
}
