import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesView } from './categories.component'
import { AngularMaterialModule } from '../angular-material.module'

@NgModule({
  declarations: [CategoriesView],
  imports: [CommonModule, AngularMaterialModule]
})
export class CategoriesModule {}
