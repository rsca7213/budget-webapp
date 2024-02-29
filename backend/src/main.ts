import { NestFactory } from '@nestjs/core'
import { AppModule } from './infrastructure/app.module'
import { BootstrapServerService } from './infrastructure/services/bootstrap-server.service'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const bootstrapServerService = new BootstrapServerService()
  bootstrapServerService.startDomainValidationService(true)

  const config = new DocumentBuilder()
    .setTitle('Budget WebApp API')
    .setDescription('API Reference for Budget WebApp')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('0.0.1')
    .build()

  app.enableCors({
    origin: process.env.CLIENT_ROUTE
  })

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('', app, document)

  await app.listen(3000)
}
bootstrap()
