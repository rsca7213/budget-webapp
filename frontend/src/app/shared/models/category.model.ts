import { CategoryType } from '../types/category.types'

export interface Category {
  uuid?: string
  name: string
  type: CategoryType
  createdAt?: Date
  updatedAt?: Date
}
