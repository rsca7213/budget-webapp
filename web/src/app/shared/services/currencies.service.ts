import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Currency } from '../models/currency.model'
import { HttpClient } from '@angular/common/http'
import { GetCurrencyDto } from '../dto/currencies/get-currency.dto'
import { CreateCurrencyDto } from '../dto/currencies/create-currency.dto'
import { UpdateCurrencyDto } from '../dto/currencies/update-currency.dto'
import { ExchangeRate } from '../types/exchange-rate.interface'

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  public constructor(private readonly httpClient: HttpClient) {}

  public getAll(): Observable<Currency[]> {
    return this.httpClient.get<GetCurrencyDto[]>('/currencies')
  }

  public create(createCurrencyDto: CreateCurrencyDto): Observable<Currency> {
    return this.httpClient.post<GetCurrencyDto>('/currencies', createCurrencyDto)
  }

  public update(data: UpdateCurrencyDto, uuid: string): Observable<Currency> {
    return this.httpClient.put<GetCurrencyDto>(`/currencies/${uuid}`, data)
  }

  public delete(uuid: string): Observable<void> {
    return this.httpClient.delete<void>(`/currencies/${uuid}`)
  }

  public swapDefault(uuid: string): Observable<Currency[]> {
    return this.httpClient.patch<GetCurrencyDto[]>(`/currencies/swap-default/${uuid}`, {})
  }

  public calculateSwappedExchangeRates(
    oldDefault: Currency,
    newDefault: Currency,
    otherCurrencies: Currency[]
  ): ExchangeRate[] {
    const exchangeRates: ExchangeRate[] = []

    const newVsOldDefaultRate = 1 / newDefault.exchangeRate

    exchangeRates.push({
      defaultCode: newDefault.code,
      code: oldDefault.code,
      rate: newVsOldDefaultRate
    })

    otherCurrencies.forEach(currency => {
      const rate = currency.exchangeRate * newVsOldDefaultRate

      exchangeRates.push({
        defaultCode: newDefault.code,
        code: currency.code,
        rate
      })
    })

    return exchangeRates
  }
}
