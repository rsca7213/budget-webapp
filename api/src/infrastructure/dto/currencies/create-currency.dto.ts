import { ApiProperty } from '@nestjs/swagger'

export class CreateCurrencyDto {
  @ApiProperty({ example: 'Dollar' })
  name: string

  @ApiProperty({ example: 'USD' })
  code: string

  @ApiProperty({ example: 1.0 })
  exchangeRate: number
}
