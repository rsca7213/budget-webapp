import { Injectable } from '@nestjs/common'
import { ICategoryRepository } from '../../../app/interface/repository/category-repository.interface'
import { Category } from '../../../domain/entities/category.entity'
import { UuidService } from '../../services/uuid.service'

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  private categories: Category[] = [
    Category.create('cde4d425-c343-4a3d-bb0e-266f9331f165', 'Category 1', 'Income'),
    Category.create('cde4d425-c343-4a3d-bb0e-266f9331f166', 'Category 2', 'Expense'),
    Category.create('cde4d425-c343-4a3d-bb0e-266f9331f167', 'Category 3', 'Income'),
    Category.create('cde4d425-c343-4a3d-bb0e-266f9331f168', 'Category 4', 'Expense'),
    Category.create('cde4d425-c343-4a3d-bb0e-266f9331f169', 'Category 5', 'Income'),
    Category.create('cde4d425-c343-4a3d-bb0e-266f9331f170', 'Category 6', 'Expense')
  ]

  public constructor(private readonly uuidService: UuidService) {}

  public save(category: Category): void {
    this.categories.push(category)
  }

  public find(uuid: string): Category | undefined {
    return this.categories.find(category => category.getUuid() === uuid)
  }

  public findAll(): Category[] {
    return this.categories
  }

  public delete(uuid: string): void {
    this.categories = this.categories.filter(category => category.getUuid() !== uuid)
  }
}
