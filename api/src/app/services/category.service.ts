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

  public async create(name: string, type: CategoryType, userUuid: string): Promise<Category> {
    const uuid = this.uuidService.generate()

    const category = Category.create(uuid, name, type)

    const result = await this.categoryRepository.save(category, userUuid)

    if (!result)
      Exception.throw(
        'Category could not be created',
        'ApplicationService.Category.create',
        'Repository'
      )

    return category
  }

  public async find(uuid: string, userUuid: string): Promise<Category | undefined> {
    const category = await this.categoryRepository.find(uuid, userUuid)

    if (!category) {
      Exception.throw('Category was not found', 'ApplicationService.Category.find', 'NotFound')
      return
    } else return category
  }

  public async findAll(userUuid: string): Promise<Category[]> {
    return await this.categoryRepository.findAll(userUuid)
  }

  public async delete(uuid: string, userUuid: string): Promise<void> {
    const category = await this.categoryRepository.find(uuid, userUuid)

    if (!category) {
      Exception.throw('Category was not found', 'ApplicationService.Category.delete', 'NotFound')
      return
    }

    const result = await this.categoryRepository.delete(uuid, userUuid)

    if (!result)
      Exception.throw(
        'Category could not be deleted',
        'ApplicationService.Category.delete',
        'Repository'
      )
  }

  public async update(
    uuid: string,
    name: string,
    type: CategoryType,
    userUuid: string
  ): Promise<Category | undefined> {
    const category = await this.categoryRepository.find(uuid, userUuid)

    if (!category) {
      Exception.throw('Category was not found', 'ApplicationService.Category.update', 'NotFound')
      return
    }

    category.setName(name)
    category.setType(type)

    const result = await this.categoryRepository.save(category, userUuid)

    if (!result) {
      Exception.throw(
        'Category could not be updated',
        'ApplicationService.Category.update',
        'Repository'
      )
      return
    }

    return category
  }
}
