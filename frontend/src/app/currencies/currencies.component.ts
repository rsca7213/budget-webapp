import { Component, OnInit, ViewChild } from '@angular/core'
import { LoadingState } from '../shared/types/loading-state.types'
import { Currency } from '../shared/models/currency.model'
import { CurrenciesService } from '../shared/services/currencies.service'
import { CreateCurrencyDialogComponent } from './components/create-currency-dialog/create-currency-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { APP_DIALOG_SIZES } from '../shared/constants/dialog-sizes.constant'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { NotificationComponent } from '../shared/components/notification/notification.component'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { CreateCurrencyDto } from '../shared/dto/currencies/create-currency.dto'

@Component({
  selector: 'views-currencies',
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss'
})
export class CurrenciesView implements OnInit {
  @ViewChild(NotificationComponent) public notification: NotificationComponent
  @ViewChild(ErrorDialogComponent) public errorDialog: ErrorDialogComponent
  @ViewChild(LoadingDialogComponent) public loadingDialog: LoadingDialogComponent

  public viewState: LoadingState = 'loading'

  public currencies: Currency[] = []
  public defaultCurrency: Currency | undefined

  public constructor(
    private readonly currenciesService: CurrenciesService,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.loadView()
  }

  public loadView(): void {
    this.viewState = 'loading'
    this.currenciesService.getAll().subscribe({
      next: (currencies: Currency[]) => {
        this.currencies = currencies.filter(currency => !currency.isDefault)
        this.defaultCurrency = currencies.find(currency => currency.isDefault)
        this.viewState = 'ready'
      },
      error: () => {
        this.viewState = 'error'
      }
    })
  }

  public openCreateCurrencyDialog(): void {
    const ref = this.dialog.open(CreateCurrencyDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: this.defaultCurrency
    })

    ref
      .afterClosed()
      .subscribe((data: CreateCurrencyDto) => {
        if (!data) return

        this.loadingDialog.open()
        this.currenciesService.create(data).subscribe({
          next: currency => {
            if (currency.isDefault) {
              this.defaultCurrency = currency
            } else {
              this.currencies.push(currency)
            }
            this.notification.notify('Currency created successfully', 'Close')
          },
          error: err => {
            this.errorDialog.open('Failed to create currency', err.message)
          }
        })
      })
      .add(() => this.loadingDialog.close())
  }
}
