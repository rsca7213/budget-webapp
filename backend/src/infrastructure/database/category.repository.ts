import { Injectable } from '@nestjs/common'
import { ICategoryRepository } from '../../app/interface/repository/category-repository.interface'
import { Category } from '../../domain/entities/category.entity'

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  public constructor() {}

  public async save(category: Category): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async find(uuid: string): Promise<Category> {
    throw new Error('Method not implemented.')
  }

  public async findAll(): Promise<Category[]> {
    throw new Error('Method not implemented.')
  }

  public async delete(uuid: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
