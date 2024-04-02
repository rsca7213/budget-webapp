import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Exception } from '../../domain/exception/exception'

@Catch()
export class CatchExceptionsService implements ExceptionFilter {
  private enum = {
    Validation: HttpStatus.UNPROCESSABLE_ENTITY,
    Verification: HttpStatus.CONFLICT,
    NotFound: HttpStatus.NOT_FOUND,
    Authorization: HttpStatus.UNAUTHORIZED,
    Privilege: HttpStatus.FORBIDDEN,
    Repository: HttpStatus.INTERNAL_SERVER_ERROR,
    Generic: HttpStatus.INTERNAL_SERVER_ERROR
  }

  public constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  public catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()

    const httpException = this.map(exception as Exception | Error)

    httpAdapter.reply(ctx.getResponse(), httpException.getResponse(), httpException.getStatus())
  }

  private map(error: Exception | Error): HttpException {
    if (error instanceof Exception) {
      return new HttpException(
        { message: error.getMessage(), details: error.getDetails() },
        this.enum[error.getReason()]
      )
    } else {
      switch (error.message) {
        case 'User is not authenticated':
          return new HttpException(
            {
              message: 'User is not authenticated',
              details:
                '[API.AuthGuard] An auth cookie was not provided or was incorrect, invalid or expired.'
            },
            HttpStatus.UNAUTHORIZED
          )
        default:
          return new HttpException(
            {
              message: error.message,
              details: '[API.Generic] An unexpected error occurred, please try again later.'
            },
            HttpStatus.INTERNAL_SERVER_ERROR
          )
      }
    }
  }
}
