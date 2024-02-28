import { Category } from '../../../domain/entities/category.entity'
import { IRepository } from '../repository.interface'

export interface ICategoryRepository extends IRepository<Category> {}
