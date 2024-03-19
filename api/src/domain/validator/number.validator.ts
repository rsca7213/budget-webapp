import { IValidator } from '../interface/validator.interface'

export interface INumberValidator extends IValidator<number> {
  validateType(value: number): boolean
  validateMin(value: number, min: number, eq: boolean): boolean
  validateMax(value: number, max: number, eq: boolean): boolean
}
