import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { BootstrapServer } from './infrastructure/shared/bootstrap-server.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const bootstrapServer = new BootstrapServer()
  bootstrapServer.startExceptionService()

  await app.listen(3000)
}
bootstrap()
