import { NestFactory } from '@nestjs/core'
import { AppModule } from './infrastructure/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Budget WebApp API')
    .setDescription('API Reference for Budget WebApp')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('0.0.1')
    .addCookieAuth('auth', { type: 'apiKey' })
    .build()

  app.enableCors({
    origin: process.env.CLIENT_ROUTE,
    credentials: true
  })

  app.use(cookieParser())

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('', app, document)

  await app.listen(3000)
}
bootstrap()
