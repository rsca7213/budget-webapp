import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { CreateUserDto } from '../dto/users/create-user.dto'
import { UserService } from '../../app/services/user.service'
import { UuidService } from '../services/uuid.service'
import { UserRepository } from '../database/user.repository'
import { HashService } from '../services/hash.service'
import { ApiTags } from '@nestjs/swagger'
import { VerifyUserCredentialsDto } from '../dto/users/verify-credentials.dto'
import { User } from '../../domain/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'

@Controller('api/users')
export class UserController {
  private readonly userService: UserService

  public constructor(
    private readonly uuidService: UuidService,
    private readonly hashService: HashService,
    private readonly userRepository: UserRepository,
    private jwtService: JwtService
  ) {
    this.userService = new UserService(uuidService, hashService, userRepository)
  }

  @Post('')
  @ApiTags('Authentication')
  public async create(@Body() data: CreateUserDto): Promise<void> {
    await this.userService.create(data.name, data.email, data.password)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiTags('Authentication')
  public async login(
    @Body() data: VerifyUserCredentialsDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<void> {
    const user = (await this.userService.verifyCredentials(data.email, data.password)) as User
    const jwt = await this.jwtService.signAsync({
      uuid: user.getUuid(),
      email: user.getEmail(),
      name: user.getName()
    })

    response.cookie('auth', jwt, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.JWT_ONLY_HTTPS === 'true',
      maxAge: Number(process.env.JWT_EXPIRES_HOURS) * 60 * 60 * 1000
    })
  }
}
