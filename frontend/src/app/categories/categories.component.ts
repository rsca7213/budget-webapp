import { Component, OnInit, ViewChild } from '@angular/core'
import { Category } from '../shared/models/category.model'
import { CategoriesService } from '../shared/services/categories.service'
import { MatDialog } from '@angular/material/dialog'
import { CreateCategoryDialogComponent } from './components/create-category-dialog/create-category-dialog.component'
import { APP_DIALOG_SIZES } from '../shared/constants/dialog-sizes.constant'
import { CreateCategoryDto } from '../shared/dto/create-category.dto'
import { LoadingState } from '../shared/types/loading-state.types'
import { NotificationComponent } from '../shared/components/notification/notification.component'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { EditCategoryDialogComponent } from './components/edit-category-dialog/edit-category-dialog.component'
import { UpdateCategoryDto } from '../shared/dto/update-category.dto'
import { DeleteCategoryDialogComponent } from './components/delete-category-dialog/delete-category-dialog.component'

@Component({
  selector: 'categories-view',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesView implements OnInit {
  @ViewChild(NotificationComponent) public notification: NotificationComponent
  @ViewChild(ErrorDialogComponent) public errorDialog: ErrorDialogComponent
  @ViewChild(LoadingDialogComponent) public loadingDialog: LoadingDialogComponent

  public categories: Category[] = []
  public incomeCategories: Category[] = []
  public expenseCategories: Category[] = []

  public viewState: LoadingState = 'loading'

  public constructor(private readonly categoriesService: CategoriesService, private readonly dialog: MatDialog) {}

  public loadView(): void {
    this.viewState = 'loading'
    this.categoriesService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories
        this.divideCategories()
        this.viewState = 'ready'
      },
      error: () => {
        this.viewState = 'error'
      }
    })
  }

  public ngOnInit(): void {
    this.loadView()
  }

  public openEditCategoryDialog(category: Category): void {
    const ref = this.dialog.open(EditCategoryDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: {
        name: category.name,
        type: category.type
      }
    })

    ref
      .afterClosed()
      .subscribe((data: UpdateCategoryDto) => {
        if (!data) return

        this.loadingDialog.open()
        this.categoriesService.update(category.uuid, data).subscribe({
          next: () => {
            this.notification.notify('Category updated successfully', 'Close')
            this.loadView()
          },
          error: err => {
            this.errorDialog.open('Failed to update category', err.message)
          }
        })
      })
      .add(() => this.loadingDialog.close())
  }

  public openDeleteCategoryDialog(category: Category): void {
    const ref = this.dialog.open(DeleteCategoryDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: category.uuid
    })

    ref
      .afterClosed()
      .subscribe((uuid: string) => {
        if (!uuid) return

        this.loadingDialog.open()
        this.categoriesService.delete(uuid).subscribe({
          next: () => {
            this.notification.notify('Category deleted successfully', 'Close')
            this.loadView()
          },
          error: err => {
            this.errorDialog.open('Failed to delete category', err.message)
          }
        })
      })
      .add(() => this.loadingDialog.close())
  }

  public openCreateCategoryDialog(): void {
    const ref = this.dialog.open(CreateCategoryDialogComponent, {
      width: APP_DIALOG_SIZES.md
    })

    ref
      .afterClosed()
      .subscribe((data: CreateCategoryDto) => {
        if (!data) return

        this.loadingDialog.open()
        this.categoriesService.create(data).subscribe({
          next: () => {
            this.notification.notify('Category created successfully', 'Close')
            this.loadView()
          },
          error: err => {
            this.errorDialog.open('Failed to create category', err.message)
          }
        })
      })
      .add(() => this.loadingDialog.close())
  }

  public divideCategories(): void {
    this.incomeCategories = this.categories.filter(category => category.type === 'Income')
    this.expenseCategories = this.categories.filter(category => category.type === 'Expense')
  }
}
