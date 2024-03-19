import { IValidator } from '../interface/validator.interface'

export interface IUuidValidator extends IValidator<string> {
  validate(uuid: string): boolean
}
