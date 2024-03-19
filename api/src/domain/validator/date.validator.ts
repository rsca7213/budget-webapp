import { IValidator } from '../interface/validator.interface'

export interface IDateValidator extends IValidator<Date> {
  validateType(date: Date): boolean

  validateNonFuture(date: Date): boolean

  validateNonPast(date: Date): boolean
}
