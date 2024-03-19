import { CategoryType } from '../../types/category.types'

export interface GetCategoryDto {
  uuid: string
  name: string
  type: CategoryType
  createdAt: Date
  updatedAt: Date
}
