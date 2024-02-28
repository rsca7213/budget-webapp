import { IValidator } from '../interface/validator.interface'

export interface IBooleanValidator extends IValidator<boolean> {
  validateType(value: boolean): boolean
}
