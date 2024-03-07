import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CurrenciesView } from './currencies.component'
import { SharedModule } from '../shared/shared.module'
import { AngularMaterialModule } from '../angular-material.module'
import { CurrenciesRoutingModule } from './currencies-routing.module'
import { CurrenciesListComponent } from './components/currencies-list/currencies-list.component'

@NgModule({
  declarations: [CurrenciesView, CurrenciesListComponent],
  imports: [CommonModule, SharedModule, AngularMaterialModule, CurrenciesRoutingModule]
})
export class CurrenciesModule {}
