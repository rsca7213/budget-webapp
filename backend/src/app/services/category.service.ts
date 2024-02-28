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

  public create(name: string, type: CategoryType): Category {
    const uuid = this.uuidService.generate()

    const category = Category.create(uuid, name, type)

    this.categoryRepository.save(category)

    return category
  }

  public find(uuid: string): Category | undefined {
    const category = this.categoryRepository.find(uuid)

    if (!category) Exception.throw('Category was not found', 'ApplicationService.Category.find', 'Not Found')

    return category
  }

  public findAll(): Category[] {
    return this.categoryRepository.findAll()
  }
}
