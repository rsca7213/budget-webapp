import { Module } from '@nestjs/common'
import { UserController } from './infrastructure/controllers/user.controller'
import { UuidService } from './infrastructure/services/uuid.service'
import { HashService } from './infrastructure/services/hash.service'
import { UserRepository } from './infrastructure/database/user.repository'
import { ExceptionMapper } from './infrastructure/mappers/exception.mapper'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserDatabaseEntity } from './infrastructure/database/models/user.orm.entity'
import { CategoryDatabaseEntity } from './infrastructure/database/models/category.orm.entity'
import { CategoryRepository } from './infrastructure/database/category.repository'
import { CategoryController } from './infrastructure/controllers/category.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserDatabaseEntity, CategoryDatabaseEntity],
      synchronize: true
    }),
    TypeOrmModule.forFeature([UserDatabaseEntity, CategoryDatabaseEntity])
  ],
  controllers: [UserController, CategoryController],
  providers: [
    // Common services
    UuidService,
    HashService,
    ExceptionMapper,
    // Repositories
    UserRepository,
    CategoryRepository
  ]
})
export class AppModule {}
