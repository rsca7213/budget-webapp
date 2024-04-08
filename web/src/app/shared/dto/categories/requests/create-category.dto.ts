import { CategoryType } from '../../../types/category.types'

export interface CreateCategoryRequestDto {
  name: string
  type: CategoryType
}
