import { CategoryType } from '../../../types/category.types'

export interface UpdateCategoryRequestDto {
  name: string
  type: CategoryType
}
