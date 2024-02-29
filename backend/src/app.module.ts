import { Module } from '@nestjs/common'
import { UserController } from './infrastructure/controllers/user.controller'
import { UuidService } from './infrastructure/services/uuid.service'
import { HashService } from './infrastructure/services/hash.service'
import { UserRepository } from './infrastructure/database/user.repository'
import { ExceptionMapper } from './infrastructure/mappers/exception.mapper'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UuidService, HashService, ExceptionMapper, UserRepository]
})
export class AppModule {}
