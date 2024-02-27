import { IValidator } from '../abstract/validator.interface'

export interface INumberValidator extends IValidator<number> {
  validate_type(value: number): boolean
  validate_min(value: number, min: number): boolean
  validate_max(value: number, max: number): boolean
}
