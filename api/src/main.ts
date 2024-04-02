import { NestFactory } from '@nestjs/core'
import { AppModule } from './infrastructure/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { readFileSync } from 'fs'
import { INestApplication } from '@nestjs/common'

async function bootstrap(): Promise<void> {
  let app: INestApplication

  if (process.env.HTTPS === 'true') {
    const httpsOptions = {
      key: readFileSync(process.env.SSL_KEY_PATH as string),
      cert: readFileSync(process.env.SSL_CERT_PATH as string)
    }
    app = await NestFactory.create(AppModule, { httpsOptions })
  } else {
    app = await NestFactory.create(AppModule)
  }

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
  SwaggerModule.setup('/docs', app, document)

  await app.listen(Number(process.env.PORT), '0.0.0.0')
}
bootstrap()
