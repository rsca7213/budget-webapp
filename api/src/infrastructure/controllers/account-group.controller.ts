import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger'
import { AccountGroupService } from '../../app/services/account-group.service'
import { UuidService } from '../services/uuid.service'
import { AccountGroupRepository } from '../database/account-group.repository'
import { AuthUserDto } from '../dto/users/auth.dto'
import { AccountGroup } from '../../domain/entities/account-group.entity'
import { GetAccountGroupDto } from '../dto/account-group/get-account-group.dto'
import { CreateAccountGroupDto } from '../dto/account-group/create-account-group.dto'
import { AuthUser } from '../decorators/auth-user.decorator'

@Controller('api/account-groups')
@UseGuards(AuthGuard)
@ApiCookieAuth('auth')
export class AccountGroupController {
  private readonly accountGroupService: AccountGroupService

  public constructor(
    private readonly uuidService: UuidService,
    private readonly accountGroupRepository: AccountGroupRepository
  ) {
    this.accountGroupService = new AccountGroupService(uuidService, accountGroupRepository)
  }

  @Get()
  @ApiTags('Account Group')
  public async findAll(@AuthUser() auth: AuthUserDto): Promise<GetAccountGroupDto[]> {
    let accountGroups: AccountGroup[] = await this.accountGroupService.findAll(auth.uuid)

    return accountGroups.map(accountGroup => {
      return {
        uuid: accountGroup.getUuid(),
        name: accountGroup.getName(),
        type: accountGroup.getType(),
        createdAt: accountGroup.getCreatedAt().toISOString(),
        updatedAt: accountGroup.getUpdatedAt().toISOString()
      }
    })
  }

  @Post()
  @ApiTags('Account Group')
  public async create(
    @Body() data: CreateAccountGroupDto,
    @AuthUser() auth: AuthUserDto
  ): Promise<GetAccountGroupDto> {
    const accountGroup = await this.accountGroupService.create(data.name, data.type, auth.uuid)

    return {
      uuid: accountGroup.getUuid(),
      name: accountGroup.getName(),
      type: accountGroup.getType(),
      createdAt: accountGroup.getCreatedAt().toISOString(),
      updatedAt: accountGroup.getUpdatedAt().toISOString()
    }
  }
}
