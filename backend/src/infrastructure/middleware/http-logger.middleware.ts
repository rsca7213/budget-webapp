import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { bold, greenBright, magentaBright, yellowBright, cyanBright, redBright, white } from 'chalk'
import { JwtService } from '@nestjs/jwt'
import { AuthUserDto } from '../dto/users/auth.dto'

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  public constructor(private readonly jwtService: JwtService) {}

  private getDate(): string {
    return white(
      new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      })
    )
  }

  private getMethod(method: string): string {
    switch (method) {
      case 'GET':
        return greenBright(`GET`)

      case 'POST':
        return magentaBright('POST')

      case 'PUT':
        return yellowBright('PUT')

      case 'PATCH':
        return cyanBright('PATCH')

      case 'DELETE':
        return redBright('DELETE')

      default:
        return white(method)
    }
  }

  private getUrl(url: string): string {
    return white(
      url.replace(/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/g, ':uuid')
    )
  }

  private getUser(req: Request): string {
    const jwt = req.cookies.auth

    if (!jwt) return redBright('Not authenticated')

    const user = this.jwtService.decode(jwt) as AuthUserDto

    return yellowBright(user.email)
  }

  private getStatus(status: number): string {
    if (status >= 200 && status < 300) return greenBright('\\' + status.toString())
    if (status >= 300 && status < 400) return cyanBright('\\' + status.toString())
    if (status >= 400 && status < 500) return yellowBright('\\' + status.toString())
    if (status >= 500) return redBright('\\' + status.toString())

    return white('\\' + status.toString())
  }

  public use(req: Request, res: Response, next: NextFunction) {
    const http = bold.blueBright('[HTTP]')
    const startTime = process.hrtime()

    res.on('finish', () => {
      const duration = (process.hrtime(startTime)[1] / 1000000).toFixed(0)

      console.log(
        `${http} ${this.getDate()} - ${this.getMethod(req.method)}${this.getStatus(res.statusCode)} ${this.getUrl(req.originalUrl)} - ${this.getUser(req)} [${duration}ms]`
      )
    })

    next()
  }
}
