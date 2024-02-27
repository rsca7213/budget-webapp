import { IValidator } from '../abstract/validator.interface'

export interface IBooleanValidator extends IValidator<boolean> {
  validate_type(value: boolean): boolean
}
