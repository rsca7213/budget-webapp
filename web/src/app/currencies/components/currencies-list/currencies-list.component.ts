import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Currency } from '../../../shared/models/currency.model'

@Component({
  selector: 'currencies-components-currencies-list',
  templateUrl: './currencies-list.component.html',
  styleUrl: './currencies-list.component.scss'
})
export class CurrenciesListComponent {
  @Input() currencies: Currency[] = []
  @Input() defaultCurrency: Currency | undefined
  @Output() edit = new EventEmitter<Currency>()
  @Output() delete = new EventEmitter<Currency>()
  @Output() swap = new EventEmitter<void>()
}
