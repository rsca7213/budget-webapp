import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CurrenciesView } from './currencies.component'
import { SharedModule } from '../shared/shared.module'
import { AngularMaterialModule } from '../angular-material.module'
import { CurrenciesRoutingModule } from './currencies-routing.module'
import { CurrenciesListComponent } from './components/currencies-list/currencies-list.component'
import { CreateCurrencyDialogComponent } from './components/create-currency-dialog/create-currency-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [CurrenciesView, CurrenciesListComponent, CreateCurrencyDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    CurrenciesRoutingModule
  ]
})
export class CurrenciesModule {}
