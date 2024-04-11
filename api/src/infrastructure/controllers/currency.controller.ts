import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { CurrencyService } from '../../app/services/currency.service'
import { UuidService } from '../services/uuid.service'
import { CurrencyRepository } from '../database/currency.repository'
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Currency } from '../../domain/entities/currency.entity'
import { GetCurrencyDto } from '../dto/currencies/get-currency.dto'
import { AuthUserDto } from '../dto/users/auth.dto'
import { CreateCurrencyDto } from '../dto/currencies/create-currency.dto'
import { UpdateCurrencyDto } from '../dto/currencies/update-currency.dto'
import { AuthUser } from '../decorators/auth-user.decorator'

@Controller('api/currencies')
@UseGuards(AuthGuard)
@ApiCookieAuth('auth')
@ApiTags('Currency')
export class CurrencyController {
  private readonly currencyService: CurrencyService

  public constructor(
    private readonly uuidService: UuidService,
    currencyRepository: CurrencyRepository
  ) {
    this.currencyService = new CurrencyService(uuidService, currencyRepository)
  }

  @Get()
  @ApiOperation({ summary: 'Get all currencies for auth user' })
  public async findAll(@AuthUser() auth: AuthUserDto): Promise<GetCurrencyDto[]> {
    const currencies: Currency[] = await this.currencyService.findAll(auth.uuid)

    return currencies.map(currency => {
      return {
        uuid: currency.getUuid(),
        name: currency.getName(),
        code: currency.getCode(),
        exchangeRate: currency.getExchangeRate(),
        isDefault: currency.getIsDefault(),
        createdAt: currency.getCreatedAt().toISOString(),
        updatedAt: currency.getUpdatedAt().toISOString()
      }
    })
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a currency for auth user' })
  public async find(
    @Param('uuid') uuid: string,
    @AuthUser() auth: AuthUserDto
  ): Promise<GetCurrencyDto> {
    const currency = (await this.currencyService.find(uuid, auth.uuid)) as Currency

    return {
      uuid: currency.getUuid(),
      name: currency.getName(),
      code: currency.getCode(),
      exchangeRate: currency.getExchangeRate(),
      isDefault: currency.getIsDefault(),
      createdAt: currency.getCreatedAt().toISOString(),
      updatedAt: currency.getUpdatedAt().toISOString()
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new currency for auth user' })
  public async create(
    @Body() data: CreateCurrencyDto,
    @AuthUser() auth: AuthUserDto
  ): Promise<GetCurrencyDto> {
    const currency = (await this.currencyService.create(
      data.name,
      data.code,
      data.exchangeRate,
      auth.uuid
    )) as Currency

    return {
      uuid: currency.getUuid(),
      name: currency.getName(),
      code: currency.getCode(),
      exchangeRate: currency.getExchangeRate(),
      isDefault: currency.getIsDefault(),
      createdAt: currency.getCreatedAt().toISOString(),
      updatedAt: currency.getUpdatedAt().toISOString()
    }
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Update a currency for auth user' })
  public async update(
    @Param('uuid') uuid: string,
    @Body() data: UpdateCurrencyDto,
    @AuthUser() auth: AuthUserDto
  ): Promise<GetCurrencyDto> {
    const currency = (await this.currencyService.update(
      uuid,
      data.name,
      data.code,
      data.exchangeRate,
      auth.uuid
    )) as Currency

    return {
      uuid: currency.getUuid(),
      name: currency.getName(),
      code: currency.getCode(),
      exchangeRate: currency.getExchangeRate(),
      isDefault: currency.getIsDefault(),
      createdAt: currency.getCreatedAt().toISOString(),
      updatedAt: currency.getUpdatedAt().toISOString()
    }
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a currency for auth user' })
  public async delete(@Param('uuid') uuid: string, @AuthUser() auth: AuthUserDto): Promise<void> {
    await this.currencyService.delete(uuid, auth.uuid)
  }

  @Patch('swap-default/:uuid')
  @ApiOperation({ summary: 'Swap default currency for auth user' })
  public async swapDefault(
    @Param('uuid') uuid: string,
    @AuthUser() auth: AuthUserDto
  ): Promise<GetCurrencyDto[]> {
    const currencies: Currency[] = (await this.currencyService.swapDefaultCurrency(
      uuid,
      auth.uuid
    )) as Currency[]

    return currencies.map(currency => {
      return {
        uuid: currency.getUuid(),
        name: currency.getName(),
        code: currency.getCode(),
        exchangeRate: currency.getExchangeRate(),
        isDefault: currency.getIsDefault(),
        createdAt: currency.getCreatedAt().toISOString(),
        updatedAt: currency.getUpdatedAt().toISOString()
      }
    })
  }
}
