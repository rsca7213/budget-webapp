import { Injectable } from '@nestjs/common'
import { ICategoryRepository } from '../../app/interface/repository/category-repository.interface'
import { Category } from '../../domain/entities/category.entity'

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  public constructor() {}

  public save(category: Category): void {
    throw new Error('Method not implemented.')
  }

  public find(uuid: string): Category {
    throw new Error('Method not implemented.')
  }

  public findAll(): Category[] {
    throw new Error('Method not implemented.')
  }

  public delete(uuid: string): void {
    throw new Error('Method not implemented.')
  }
}
