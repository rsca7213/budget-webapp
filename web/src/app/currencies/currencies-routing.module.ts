import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CurrenciesView } from './currencies.component'

const routes: Routes = [
  {
    path: '',
    component: CurrenciesView
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrenciesRoutingModule {}
