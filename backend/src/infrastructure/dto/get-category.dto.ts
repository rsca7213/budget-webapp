import { ApiProperty } from '@nestjs/swagger'

export class GetCategoryDto {
  @ApiProperty({ example: 'uuid' })
  uuid: string

  @ApiProperty({ example: 'Groceries' })
  name: string

  @ApiProperty({ example: 'Income' })
  type: string
}
