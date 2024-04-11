import { AccountType } from '../types/account.types'

export interface AccountGroup {
  uuid: string
  name: string
  type: AccountType
  createdAt: Date
  updatedAt: Date
}
