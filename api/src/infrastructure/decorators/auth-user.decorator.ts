import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthUserDto } from '../dto/users/auth.dto'

// eslint-disable-next-line @typescript-eslint/naming-convention -- This is a decorator
export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUserDto => {
    const request = ctx.switchToHttp().getRequest()
    return request.auth
  }
)
