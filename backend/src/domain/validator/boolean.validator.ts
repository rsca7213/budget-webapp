import { IValidator } from '../interface/validator.interface'

export interface IBooleanValidator extends IValidator<boolean> {
  validate_type(value: boolean): boolean
}
