import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Currency } from '../models/currency.model'
import { HttpClient } from '@angular/common/http'
import { GetCurrencyDto } from '../dto/currencies/get-currency.dto'

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  public constructor(private readonly httpClient: HttpClient) {}

  public getAll(): Observable<Currency[]> {
    return this.httpClient.get<GetCurrencyDto[]>('/currencies')
  }
}
