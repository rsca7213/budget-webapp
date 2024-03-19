import { MiddlewareConsumer, Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller'
import { UuidService } from './services/uuid.service'
import { HashService } from './services/hash.service'
import { UserRepository } from './database/user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserDatabaseEntity } from './database/models/user.orm.entity'
import { CategoryDatabaseEntity } from './database/models/category.orm.entity'
import { CategoryRepository } from './database/category.repository'
import { CategoryController } from './controllers/category.controller'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { APP_FILTER } from '@nestjs/core'
import { CatchExceptionsService } from './services/exceptions.service'
import { CurrencyController } from './controllers/currency.controller'
import { CurrencyDatabaseEntity } from './database/models/currency.orm.entity'
import { CurrencyRepository } from './database/currency.repository'
import { HttpLoggerMiddleware } from './middleware/http-logger.middleware'
import { AccountGroupDatabaseEntity } from './database/models/account-group.orm.entity'
import { AccountGroupController } from './controllers/account-group.controller'
import { AccountGroupRepository } from './database/account-group.repository'

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
      entities: [
        UserDatabaseEntity,
        CategoryDatabaseEntity,
        CurrencyDatabaseEntity,
        AccountGroupDatabaseEntity
      ],
      synchronize: true
    }),
    TypeOrmModule.forFeature([
      UserDatabaseEntity,
      CategoryDatabaseEntity,
      CurrencyDatabaseEntity,
      AccountGroupDatabaseEntity
    ])
  ],
  controllers: [UserController, CategoryController, CurrencyController, AccountGroupController],
  providers: [
    // Common services
    UuidService,
    HashService,
    // Repositories
    UserRepository,
    CategoryRepository,
    CurrencyRepository,
    AccountGroupRepository,
    // Exceptions
    {
      provide: APP_FILTER,
      useClass: CatchExceptionsService
    }
  ]
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*')
  }
}
