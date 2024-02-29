import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { UserService } from '../../app/services/user.service'
import { UuidService } from '../services/uuid.service'
import { UserRepository } from '../database/user.repository'
import { HashService } from '../services/hash.service'
import { ExceptionMapper } from '../mappers/exception.mapper'
import {
  ApiBasicAuth,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger'

@Controller('api/user')
export class UserController {
  private readonly userService: UserService

  public constructor(
    private readonly uuidService: UuidService,
    private readonly hashService: HashService,
    private readonly exceptionMapper: ExceptionMapper,
    private readonly userRepository: UserRepository
  ) {
    this.userService = new UserService(uuidService, hashService, userRepository)
  }

  @Post()
  @ApiTags('User')
  public async create(@Body() data: CreateUserDto): Promise<void> {
    try {
      await this.userService.create(data.name, data.email, data.password)
    } catch (error) {
      this.exceptionMapper.map(error)
    }
  }
}
