import { ApiProperty } from '@nestjs/swagger'

export class GetCategoryDto {
  @ApiProperty({ example: 'uuid' })
  uuid: string

  @ApiProperty({ example: 'Groceries' })
  name: string

  @ApiProperty({ example: 'Income' })
  type: string

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  createdAt: string

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  updatedAt: string
}
