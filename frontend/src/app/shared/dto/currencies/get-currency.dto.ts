export interface GetCurrencyDto {
  uuid: string
  name: string
  code: string
  exchangeRate: number
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}
