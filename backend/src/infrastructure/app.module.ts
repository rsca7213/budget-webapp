import { Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller'
import { UuidService } from './services/uuid.service'
import { HashService } from './services/hash.service'
import { UserRepository } from './database/user.repository'
import { ExceptionMapper } from './mappers/exception.mapper'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserDatabaseEntity } from './database/models/user.orm.entity'
import { CategoryDatabaseEntity } from './database/models/category.orm.entity'
import { CategoryRepository } from './database/category.repository'
import { CategoryController } from './controllers/category.controller'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h` }
    }),
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
