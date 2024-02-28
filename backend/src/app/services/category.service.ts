import { Category } from '../../domain/entities/category.entity'
import { CategoryType } from '../../domain/types/category.types'
import { IUuidService } from '../interface/uuid-service.interface'

export class CategoryService {
  public constructor(private readonly uuidService: IUuidService) {}

  public create(name: string, type: CategoryType): Category {
    const uuid = this.uuidService.generate()

    return Category.create(uuid, name, type)
  }
}
