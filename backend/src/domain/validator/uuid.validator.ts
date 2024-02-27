import { IValidator } from '../abstract/validator.interface'

export interface IUuidValidator extends IValidator<string> {
  validate(uuid: string): boolean
}
