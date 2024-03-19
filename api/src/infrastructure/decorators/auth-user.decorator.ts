import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthUserDto } from '../dto/users/auth.dto'

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUserDto => {
    const request = ctx.switchToHttp().getRequest()
    return request.auth
  }
)
