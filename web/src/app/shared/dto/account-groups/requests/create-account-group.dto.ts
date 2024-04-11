import { AccountType } from '../../../types/account.types'

export interface CreateAccountGroupRequestDto {
  name: string
  type: AccountType
}
