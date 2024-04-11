import { AccountType } from '../../../types/account.types'

export interface GetAccountGroupResponseDto {
  uuid: string
  name: string
  type: AccountType
  createdAt: Date
  updatedAt: Date
}
