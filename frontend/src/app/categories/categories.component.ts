import { Component, OnInit } from '@angular/core'
import { Category } from '../shared/models/category.model'
import { CategoriesService } from '../shared/services/categories.service'
import { MatDialog } from '@angular/material/dialog'
import { CreateCategoryDialogComponent } from './components/create-category-dialog/create-category-dialog.component'
import { APP_DIALOG_SIZES } from '../shared/constants/dialog-sizes.constant'
import { CreateCategoryDto } from '../shared/dto/create-category.dto'

@Component({
  selector: 'categories-view',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesView implements OnInit {
  public categories: Category[] = []
  public incomeCategories: Category[] = []
  public expenseCategories: Category[] = []

  public constructor(private readonly categoriesService: CategoriesService, private readonly dialog: MatDialog) {}

  public ngOnInit(): void {
    this.categoriesService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories
      this.divideCategories()
    })
  }

  public openCreateCategoryDialog(): void {
    const ref = this.dialog.open(CreateCategoryDialogComponent, {
      width: APP_DIALOG_SIZES.md
    })

    ref.afterClosed().subscribe((data: CreateCategoryDto) => {
      if (!data) return

      this.categoriesService.create(data).subscribe({
        next: () => console.log('Category created'),
        error: () => console.log('Error')
      })
    })
  }

  public divideCategories(): void {
    this.incomeCategories = this.categories.filter(category => category.type === 'Income')
    this.expenseCategories = this.categories.filter(category => category.type === 'Expense')
  }
}
