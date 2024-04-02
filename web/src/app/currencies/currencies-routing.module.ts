import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CurrenciesViewComponent } from './currencies.component'

const routes: Routes = [
  {
    path: '',
    component: CurrenciesViewComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrenciesRoutingModule {}
