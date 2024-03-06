import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { CurrencyService } from '../../app/services/currency.service'
import { UuidService } from '../services/uuid.service'
import { CurrencyRepository } from '../database/currency.repository'
import { ApiTags } from '@nestjs/swagger'
import { Currency } from '../../domain/entities/currency.entity'
import { GetCurrencyDto } from '../dto/currencies/get-currency.dto'
import { Request } from 'express'
import { AuthUserDto } from '../dto/users/auth.dto'

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
}
