import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { BootstrapServerService } from './infrastructure/shared/services/bootstrap-server.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const bootstrapServerService = new BootstrapServerService()
  bootstrapServerService.startDomainValidationService(true)

  await app.listen(3000)
}
bootstrap()
