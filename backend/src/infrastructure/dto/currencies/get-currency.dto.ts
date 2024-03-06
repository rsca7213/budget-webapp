import { ApiProperty } from '@nestjs/swagger'

export class GetCurrencyDto {
  @ApiProperty({ example: 'uuid' })
  uuid: string

  @ApiProperty({ example: 'Dollar' })
  name: string

  @ApiProperty({ example: 'USD' })
  code: string

  @ApiProperty({ example: 1.0 })
  exchangeRate: number

  @ApiProperty({ example: true })
  isDefault: boolean

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  createdAt: string

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  updatedAt: string
}
