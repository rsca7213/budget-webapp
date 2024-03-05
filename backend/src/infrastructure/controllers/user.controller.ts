import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { CreateUserDto } from '../dto/users/create-user.dto'
import { UserService } from '../../app/services/user.service'
import { UuidService } from '../services/uuid.service'
import { UserRepository } from '../database/user.repository'
import { HashService } from '../services/hash.service'
import { ApiTags } from '@nestjs/swagger'
import { VerifyUserCredentialsDto } from '../dto/users/verify-credentials.dto'
import { User } from '../../domain/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { AuthGuard } from '../guards/auth.guard'
import { AuthUserDto } from '../dto/users/auth.dto'

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

  @Get('login')
  @ApiTags('Authentication')
  @UseGuards(AuthGuard)
  public async getAuthUser(@Req() req: Request & { auth: AuthUserDto }): Promise<AuthUserDto> {
    return req.auth
  }

  @Post('logout')
  @ApiTags('Authentication')
  public async logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    response.clearCookie('auth')
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
      sameSite: 'lax',
      secure: process.env.JWT_ONLY_HTTPS === 'true',
      maxAge: Number(process.env.JWT_EXPIRES_HOURS) * 60 * 60 * 1000
    })
  }
}
