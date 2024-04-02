import { Category } from '../../../domain/entities/category.entity'

export interface ICategoryRepository {
  save(entity: Category, userUuid: string): Promise<boolean>

  find(uuid: string, userUuid: string): Promise<Category | undefined>

  findAll(userUuid: string): Promise<Category[]>

  delete(uuid: string, userUuid: string): Promise<boolean>
}
