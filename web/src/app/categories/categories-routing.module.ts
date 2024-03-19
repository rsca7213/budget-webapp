import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CategoriesView } from './categories.component'

const routes: Routes = [
  {
    path: '',
    component: CategoriesView
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
