import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Exception } from '../../domain/exception/exception'

@Injectable()
export class ExceptionMapper {
  private enum = {
    Validation: HttpStatus.UNPROCESSABLE_ENTITY,
    Verification: HttpStatus.CONFLICT,
    NotFound: HttpStatus.NOT_FOUND,
    Authorization: HttpStatus.UNAUTHORIZED,
    Privilege: HttpStatus.FORBIDDEN,
    Generic: HttpStatus.INTERNAL_SERVER_ERROR
  }

  public map(error: Exception | Error): void {
    if (error instanceof Exception) {
      throw new HttpException(
        { message: error.getMessage(), details: error.getDetails() },
        this.enum[error.getReason()]
      )
    } else {
      throw new HttpException(
        {
          message: error.message,
          details: 'An unexpected error occurred, please try again later.'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}