import { Component, Input, OnInit } from '@angular/core'
import { Category } from '../../../shared/models/category.model'

@Component({
  selector: 'categories-components-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent implements OnInit {
  @Input() category: Category
  public color: 'accent' | 'warn'
  public icon: 'trending-up' | 'trending-down'

  public ngOnInit(): void {
    this.color = this.category.type === 'Expense' ? 'warn' : 'accent'
    this.icon = this.category.type === 'Expense' ? 'trending-down' : 'trending-up'
  }
}
