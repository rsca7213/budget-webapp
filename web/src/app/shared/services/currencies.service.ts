import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Currency } from '../models/currency.model'
import { HttpClient } from '@angular/common/http'
import { GetCurrencyResponseDto } from '../dto/currencies/responses/get-currency.dto'
import { CreateCurrencyRequestDto } from '../dto/currencies/requests/create-currency.dto'
import { UpdateCurrencyRequestDto } from '../dto/currencies/requests/update-currency.dto'
import { ExchangeRate } from '../types/exchange-rate.interface'

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  public constructor(private readonly httpClient: HttpClient) {}

  public getAll(): Observable<Currency[]> {
    return this.httpClient.get<GetCurrencyResponseDto[]>('/currencies')
  }

  public create(createCurrencyDto: CreateCurrencyRequestDto): Observable<Currency> {
    return this.httpClient.post<GetCurrencyResponseDto>('/currencies', createCurrencyDto)
  }

  public update(data: UpdateCurrencyRequestDto, uuid: string): Observable<Currency> {
    return this.httpClient.put<GetCurrencyResponseDto>(`/currencies/${uuid}`, data)
  }

  public delete(uuid: string): Observable<void> {
    return this.httpClient.delete<void>(`/currencies/${uuid}`)
  }

  public swapDefault(uuid: string): Observable<Currency[]> {
    return this.httpClient.patch<GetCurrencyResponseDto[]>(`/currencies/swap-default/${uuid}`, {})
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
