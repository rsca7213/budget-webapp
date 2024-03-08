import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { CurrencyService } from '../../app/services/currency.service'
import { UuidService } from '../services/uuid.service'
import { CurrencyRepository } from '../database/currency.repository'
import { ApiTags } from '@nestjs/swagger'
import { Currency } from '../../domain/entities/currency.entity'
import { GetCurrencyDto } from '../dto/currencies/get-currency.dto'
import { Request } from 'express'
import { AuthUserDto } from '../dto/users/auth.dto'
import { CreateCurrencyDto } from '../dto/currencies/create-currency.dto'
import { UpdateCurrencyDto } from '../dto/currencies/update-currency.dto'

@Controller('api/currencies')
@UseGuards(AuthGuard)
export class CurrencyController {
  private readonly currencyService: CurrencyService

  public constructor(
    private readonly uuidService: UuidService,
    currencyRepository: CurrencyRepository
  ) {
    this.currencyService = new CurrencyService(uuidService, currencyRepository)
  }

  @Get()
  @ApiTags('Currency')
  public async findAll(@Req() req: Request & { auth: AuthUserDto }): Promise<GetCurrencyDto[]> {
    let currencies: Currency[] = await this.currencyService.findAll(req.auth.uuid)

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
  @ApiTags('Currency')
  public async find(
    @Param('uuid') uuid: string,
    @Req() req: Request & { auth: AuthUserDto }
  ): Promise<GetCurrencyDto> {
    let currency = (await this.currencyService.find(uuid, req.auth.uuid)) as Currency

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
  @ApiTags('Currency')
  public async create(
    @Body() data: CreateCurrencyDto,
    @Req() req: Request & { auth: AuthUserDto }
  ): Promise<GetCurrencyDto> {
    let currency: Currency = await this.currencyService.create(
      data.name,
      data.code,
      data.exchangeRate,
      req.auth.uuid
    )

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
  @ApiTags('Currency')
  public async update(
    @Param('uuid') uuid: string,
    @Body() data: UpdateCurrencyDto,
    @Req() req: Request & { auth: AuthUserDto }
  ): Promise<GetCurrencyDto> {
    let currency = (await this.currencyService.update(
      uuid,
      data.name,
      data.code,
      data.exchangeRate,
      req.auth.uuid
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
  @ApiTags('Currency')
  public async delete(
    @Param('uuid') uuid: string,
    @Req() req: Request & { auth: AuthUserDto }
  ): Promise<void> {
    await this.currencyService.delete(uuid, req.auth.uuid)
  }
}
