import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesViewComponent } from './categories.component'
import { CategoryCardComponent } from './components/category-card/category-card.component'
import { CategoriesRoutingModule } from './categories-routing.module'
import { CreateCategoryDialogComponent } from './components/create-category-dialog/create-category-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module'
import { EditCategoryDialogComponent } from './components/edit-category-dialog/edit-category-dialog.component'
import { DeleteCategoryDialogComponent } from './components/delete-category-dialog/delete-category-dialog.component'

@NgModule({
  declarations: [
    CategoriesViewComponent,
    CategoryCardComponent,
    CreateCategoryDialogComponent,
    EditCategoryDialogComponent,
    DeleteCategoryDialogComponent
  ],
  imports: [CommonModule, CategoriesRoutingModule, ReactiveFormsModule, SharedModule]
})
export class CategoriesModule {}
