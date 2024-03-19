import { ApiProperty } from '@nestjs/swagger'
import { AccountType } from '../../../domain/types/account.types'

export class CreateAccountGroupDto {
  @ApiProperty({ example: 'Banks' })
  name: string

  @ApiProperty({ example: 'Asset' })
  type: AccountType
}
