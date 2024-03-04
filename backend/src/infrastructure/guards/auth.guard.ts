import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthUserDto } from '../dto/users/auth.dto'

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const response = context.switchToHttp().getResponse()

      const jwt = request.cookies.auth

      const payload = await this.jwtService.verifyAsync(jwt)

      request.auth = {
        uuid: payload.uuid,
        name: payload.name,
        email: payload.email,
        expires: new Date(payload.exp * 1000)
      } as AuthUserDto

      if (
        request.auth.expires.getTime() - Date.now() <
        Number(process.env.JWT_RENEWS_HOURS) * 60 * 60 * 1000
      ) {
        const jwt = await this.jwtService.signAsync({
          uuid: request.auth.uuid,
          name: request.auth.name,
          email: request.auth.email
        })

        response.cookie('auth', jwt, {
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.JWT_ONLY_HTTPS === 'true',
          maxAge: Number(process.env.JWT_EXPIRES_HOURS) * 60 * 60 * 1000
        })
      }

      return true
    } catch {
      throw new Error('User is not authenticated')
    }
  }
}
