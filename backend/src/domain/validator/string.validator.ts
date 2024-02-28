import { IValidator } from '../interface/validator.interface'

export interface IStringValidator extends IValidator<string> {
  validate_type(value: string): boolean
  validate_min_length(value: string, min_length: number): boolean
  validate_max_length(value: string, max_length: number): boolean
}
