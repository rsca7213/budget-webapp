import { IValidator } from '../abstract/validator.interface'

export interface IDateValidator extends IValidator<Date> {
  validate_type(date: Date): boolean

  validate_non_future(date: Date): boolean

  validate_non_past(date: Date): boolean
}
