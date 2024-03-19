import { Component, Input } from '@angular/core'
import { ExchangeRate } from '../../../shared/types/exchange-rate.interface'

@Component({
  selector: 'components-currency-exchange-rates-list',
  templateUrl: './currency-exchange-rates-list.component.html',
  styleUrl: './currency-exchange-rates-list.component.scss'
})
export class CurrencyExchangeRatesListComponent {
  @Input() exchangeRates: ExchangeRate[] = []
}
