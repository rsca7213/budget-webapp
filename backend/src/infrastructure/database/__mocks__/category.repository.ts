import { Injectable } from '@nestjs/common'
import { ICategoryRepository } from '../../../app/interface/repository/category-repository.interface'
import { Category } from '../../../domain/entities/category.entity'

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  private users = [
    {
      uuid: 'cde4d425-c343-4a3d-bb0e-266f9331f171',
      categories: [
        Category.create('cde4d425-c343-4a3d-bb0e-266f9331f165', 'Category 1', 'Income'),
        Category.create('cde4d425-c343-4a3d-bb0e-266f9331f166', 'Category 2', 'Expense'),
        Category.create('cde4d425-c343-4a3d-bb0e-266f9331f167', 'Category 3', 'Income'),
        Category.create('cde4d425-c343-4a3d-bb0e-266f9331f168', 'Category 4', 'Expense'),
        Category.create('cde4d425-c343-4a3d-bb0e-266f9331f169', 'Category 5', 'Income'),
        Category.create('cde4d425-c343-4a3d-bb0e-266f9331f170', 'Category 6', 'Expense')
      ]
    }
  ]

  public async save(category: Category, userUuid: string): Promise<boolean> {
    const user = this.users.find(user => user.uuid === userUuid)
    if (!user) return false
    user.categories.push(category)
    return true
  }

  public async find(uuid: string, userUuid: string): Promise<Category | undefined> {
    const user = this.users.find(user => user.uuid === userUuid)
    if (!user) return undefined
    return user.categories.find(category => category.getUuid() === uuid)
  }

  public async findAll(userUuid: string): Promise<Category[]> {
    const user = this.users.find(user => user.uuid === userUuid)
    if (!user) return []
    return user.categories
  }

  public async delete(uuid: string, userUuid: string): Promise<boolean> {
    const user = this.users.find(user => user.uuid === userUuid)
    if (!user) return false
    user.categories = user.categories.filter(category => category.getUuid() !== uuid)
    return true
  }
}
