import { ApiProperty } from '@nestjs/swagger'
import { CategoryType } from '../../../domain/types/category.types'

export class CreateCategoryDto {
  @ApiProperty({ example: 'Groceries' })
  name: string

  @ApiProperty({ example: 'Income' })
  type: CategoryType
}
