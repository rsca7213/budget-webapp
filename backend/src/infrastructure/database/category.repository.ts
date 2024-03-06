import { Injectable } from '@nestjs/common'
import { ICategoryRepository } from '../../app/interface/repository/category-repository.interface'
import { Category } from '../../domain/entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryDatabaseEntity } from './models/category.orm.entity'
import { Repository } from 'typeorm'
import { UserDatabaseEntity } from './models/user.orm.entity'

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  public constructor(
    @InjectRepository(CategoryDatabaseEntity)
    private readonly categoryOrmRepository: Repository<CategoryDatabaseEntity>,
    @InjectRepository(UserDatabaseEntity)
    private readonly userOrmRepository: Repository<UserDatabaseEntity>
  ) {}

  public async save(category: Category, userUuid: string): Promise<boolean> {
    const categoryDatabaseEntity = new CategoryDatabaseEntity()
    const userOrmRepository = await this.userOrmRepository.findOneBy({ uuid: userUuid })

    if (!userOrmRepository) return false

    categoryDatabaseEntity.uuid = category.getUuid()
    categoryDatabaseEntity.name = category.getName()
    categoryDatabaseEntity.type = category.getType()
    categoryDatabaseEntity.createdAt = category.getCreatedAt()
    categoryDatabaseEntity.updatedAt = category.getUpdatedAt()
    categoryDatabaseEntity.user = userOrmRepository

    await this.categoryOrmRepository.save(categoryDatabaseEntity)

    return true
  }

  public async find(uuid: string, userUuid: string): Promise<Category | undefined> {
    const category = await this.categoryOrmRepository.findOneBy({ uuid, user: { uuid: userUuid } })

    if (!category) return undefined

    return Category.restore(
      category.uuid,
      category.name,
      category.type,
      category.createdAt,
      category.updatedAt
    )
  }

  public async findAll(userUuid: string): Promise<Category[]> {
    const categories = await this.categoryOrmRepository.findBy({ user: { uuid: userUuid } })

    return categories.map(category =>
      Category.restore(
        category.uuid,
        category.name,
        category.type,
        category.createdAt,
        category.updatedAt
      )
    )
  }

  public async delete(uuid: string, userUuid: string): Promise<boolean> {
    await this.categoryOrmRepository.delete({ uuid, user: { uuid: userUuid } })
    return true
  }
}
