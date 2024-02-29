import { Module } from '@nestjs/common'
import { UserController } from './infrastructure/controllers/user.controller'
import { UuidService } from './infrastructure/services/uuid.service'
import { HashService } from './infrastructure/services/hash.service'
import { UserRepository } from './infrastructure/database/user.repository'
import { ExceptionMapper } from './infrastructure/mappers/exception.mapper'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserDatabaseEntity } from './infrastructure/database/models/user.orm.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserDatabaseEntity],
      synchronize: true
    }),
    TypeOrmModule.forFeature([UserDatabaseEntity])
  ],
  controllers: [UserController],
  providers: [
    // Common services
    UuidService,
    HashService,
    ExceptionMapper,
    // Repositories
    UserRepository
  ]
})
export class AppModule {}
