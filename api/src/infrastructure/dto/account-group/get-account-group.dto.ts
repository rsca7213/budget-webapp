import { ApiProperty } from '@nestjs/swagger'
import { AccountType } from '../../../domain/types/account.types'

export class GetAccountGroupDto {
  @ApiProperty({ example: 'uuid' })
  uuid: string

  @ApiProperty({ example: 'Banks' })
  name: string

  @ApiProperty({ example: 'Asset' })
  type: AccountType

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  createdAt: string

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  updatedAt: string
}
