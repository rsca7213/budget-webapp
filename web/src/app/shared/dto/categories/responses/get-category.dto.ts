import { CategoryType } from '../../../types/category.types'

export interface GetCategoryResponseDto {
  uuid: string
  name: string
  type: CategoryType
  createdAt: Date
  updatedAt: Date
}
