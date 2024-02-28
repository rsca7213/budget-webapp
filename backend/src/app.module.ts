import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UuidService } from './infrastructure/services/uuid.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [UuidService]
})
export class AppModule {}
