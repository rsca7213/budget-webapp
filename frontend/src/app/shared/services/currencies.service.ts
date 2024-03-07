import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Currency } from '../models/currency.model'
import { HttpClient } from '@angular/common/http'
import { GetCurrencyDto } from '../dto/currencies/get-currency.dto'
import { CreateCurrencyDto } from '../dto/currencies/create-currency.dto'

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
}
