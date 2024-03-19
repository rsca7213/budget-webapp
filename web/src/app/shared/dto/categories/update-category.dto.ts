import { CategoryType } from '../../types/category.types'

export interface UpdateCategoryDto {
  name: string
  type: CategoryType
}
