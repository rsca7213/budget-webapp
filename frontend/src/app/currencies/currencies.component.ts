import { Component, OnInit } from '@angular/core'
import { LoadingState } from '../shared/types/loading-state.types'
import { Currency } from '../shared/models/currency.model'
import { CurrenciesService } from '../shared/services/currencies.service'

@Component({
  selector: 'views-currencies',
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss'
})
export class CurrenciesView implements OnInit {
  public viewState: LoadingState = 'loading'

  public currencies: Currency[] = []
  public defaultCurrency: Currency | undefined

  public constructor(private readonly currenciesService: CurrenciesService) {}

  public ngOnInit(): void {
    this.loadView()
  }

  public loadView(): void {
    this.viewState = 'loading'
    this.currenciesService.getAll().subscribe({
      next: (currencies: Currency[]) => {
        this.currencies = currencies.filter(currency => !currency.isDefault)
        this.defaultCurrency = currencies.find(currency => currency.isDefault)
        this.viewState = 'ready'
      },
      error: () => {
        this.viewState = 'error'
      }
    })
  }
}
