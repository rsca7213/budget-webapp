import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CurrenciesViewComponent } from './currencies.component'
import { SharedModule } from '../shared/shared.module'
import { CurrenciesRoutingModule } from './currencies-routing.module'
import { CurrenciesListComponent } from './components/currencies-list/currencies-list.component'
import { CreateCurrencyDialogComponent } from './components/create-currency-dialog/create-currency-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'
import { EditCurrencyDialogComponent } from './components/edit-currency-dialog/edit-currency-dialog.component'
import { DeleteCurrencyDialogComponent } from './components/delete-currency-dialog/delete-currency-dialog.component'
import { SwapDefaultCurrencyDialogComponent } from './components/swap-default-currency-dialog/swap-default-currency-dialog.component'
import { CurrencyExchangeRatesListComponent } from './components/currency-exchange-rates-list/currency-exchange-rates-list.component'

@NgModule({
  declarations: [
    CurrenciesViewComponent,
    CurrenciesListComponent,
    CreateCurrencyDialogComponent,
    EditCurrencyDialogComponent,
    DeleteCurrencyDialogComponent,
    SwapDefaultCurrencyDialogComponent,
    CurrencyExchangeRatesListComponent
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, CurrenciesRoutingModule]
})
export class CurrenciesModule {}
