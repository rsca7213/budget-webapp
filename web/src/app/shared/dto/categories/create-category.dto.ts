import { CategoryType } from '../../types/category.types'

export interface CreateCategoryDto {
  name: string
  type: CategoryType
}
