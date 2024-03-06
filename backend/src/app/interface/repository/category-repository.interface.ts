import { Category } from '../../../domain/entities/category.entity'
import { IRepository } from '../repository.interface'

export interface ICategoryRepository extends IRepository<Category> {
  save(entity: Category, userUuid: string): Promise<boolean>

  find(uuid: string, userUuid: string): Promise<Category | undefined>

  findAll(userUuid: string): Promise<Category[]>

  delete(uuid: string, userUuid: string): Promise<boolean>
}
