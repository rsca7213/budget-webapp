import { Category } from '../../domain/entities/category.entity'
import { Exception } from '../../domain/exception/exception'
import { CategoryType } from '../../domain/types/category.types'
import { ICategoryRepository } from '../interface/repository/category-repository.interface'
import { IUuidService } from '../interface/uuid-service.interface'

export class CategoryService {
  public constructor(
    private readonly uuidService: IUuidService,
    private readonly categoryRepository: ICategoryRepository
  ) {}

  public async create(name: string, type: CategoryType): Promise<Category> {
    const uuid = this.uuidService.generate()

    const category = Category.create(uuid, name, type)

    await this.categoryRepository.save(category)

    return category
  }

  public async find(uuid: string): Promise<Category | void> {
    const category = await this.categoryRepository.find(uuid)

    if (!category) return Exception.throw('Category was not found', 'ApplicationService.Category.find', 'NotFound')
    else return category
  }

  public async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll()
  }

  public async delete(uuid: string): Promise<void> {
    const category = await this.categoryRepository.find(uuid)

    if (!category) return Exception.throw('Category was not found', 'ApplicationService.Category.delete', 'NotFound')

    await this.categoryRepository.delete(uuid)
  }

  public async update(uuid: string, name: string, type: CategoryType): Promise<Category | void> {
    const category = await this.categoryRepository.find(uuid)

    if (!category) return Exception.throw('Category was not found', 'ApplicationService.Category.update', 'NotFound')

    category.setName(name)
    category.setType(type)

    await this.categoryRepository.save(category)

    return category
  }
}
