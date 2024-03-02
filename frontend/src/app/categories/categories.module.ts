import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesView } from './categories.component'
import { AngularMaterialModule } from '../angular-material.module'
import { CategoryCardComponent } from './components/category-card/category-card.component'
import { CategoriesRoutingModule } from './categories-routing.module'
import { CreateCategoryDialogComponent } from './components/create-category-dialog/create-category-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [CategoriesView, CategoryCardComponent, CreateCategoryDialogComponent],
  imports: [CommonModule, AngularMaterialModule, CategoriesRoutingModule, ReactiveFormsModule]
})
export class CategoriesModule {}
