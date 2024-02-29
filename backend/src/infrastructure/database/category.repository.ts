import { Injectable } from '@nestjs/common'
import { ICategoryRepository } from '../../app/interface/repository/category-repository.interface'
import { Category } from '../../domain/entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryDatabaseEntity } from './models/category.orm.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  public constructor(
    @InjectRepository(CategoryDatabaseEntity)
    private readonly categoryOrmRepository: Repository<CategoryDatabaseEntity>
  ) {}

  public async save(category: Category): Promise<void> {
    const categoryDatabaseEntity = new CategoryDatabaseEntity()

    categoryDatabaseEntity.uuid = category.getUuid()
    categoryDatabaseEntity.name = category.getName()
    categoryDatabaseEntity.type = category.getType()
    categoryDatabaseEntity.createdAt = category.getCreatedAt()
    categoryDatabaseEntity.updatedAt = category.getUpdatedAt()

    await this.categoryOrmRepository.save(categoryDatabaseEntity)
  }

  public async find(uuid: string): Promise<Category | undefined> {
    const category = await this.categoryOrmRepository.findOneBy({ uuid })

    if (!category) return undefined

    return Category.restore(category.uuid, category.name, category.type, category.createdAt, category.updatedAt)
  }

  public async findAll(): Promise<Category[]> {
    const categories = await this.categoryOrmRepository.find()

    return categories.map(category =>
      Category.restore(category.uuid, category.name, category.type, category.createdAt, category.updatedAt)
    )
  }

  public async delete(uuid: string): Promise<void> {
    await this.categoryOrmRepository.delete(uuid)
  }
}
