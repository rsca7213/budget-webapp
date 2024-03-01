import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesView } from './categories.component'
import { AngularMaterialModule } from '../angular-material.module'
import { CategoryCardComponent } from './components/category-card/category-card.component'
import { CategoriesRoutingModule } from './categories-routing.module'

@NgModule({
  declarations: [CategoriesView, CategoryCardComponent],
  imports: [CommonModule, AngularMaterialModule, CategoriesRoutingModule]
})
export class CategoriesModule {}
