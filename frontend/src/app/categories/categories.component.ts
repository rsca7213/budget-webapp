import { Component, OnInit } from '@angular/core'
import { Category } from '../shared/models/category.model'
import { CategoriesService } from '../shared/services/categories.service'

@Component({
  selector: 'categories-view',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesView implements OnInit {
  public categories: Category[] = []
  public incomeCategories: Category[] = []
  public expenseCategories: Category[] = []

  public constructor(private readonly categoriesService: CategoriesService) {}

  public ngOnInit(): void {
    this.categoriesService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories
      this.divideCategories()
    })
  }

  public divideCategories(): void {
    this.incomeCategories = this.categories.filter(category => category.type === 'Income')
    this.expenseCategories = this.categories.filter(category => category.type === 'Expense')
  }
}