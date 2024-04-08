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
import { CreateCurrencyRequestDto } from '../shared/dto/currencies/requests/create-currency.dto'
import { EditCurrencyDialogComponent } from './components/edit-currency-dialog/edit-currency-dialog.component'
import { UpdateCurrencyRequestDto } from '../shared/dto/currencies/requests/update-currency.dto'
import { DeleteCurrencyDialogComponent } from './components/delete-currency-dialog.component'
import { SwapDefaultCurrencyDialogComponent } from './components/swap-default-currency-dialog/swap-default-currency-dialog.component'
import { finalize } from 'rxjs'

@Component({
  selector: 'views-currencies',
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss'
})
export class CurrenciesViewComponent implements OnInit {
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

    ref.afterClosed().subscribe((data: CreateCurrencyRequestDto) => {
      if (!data) return

      this.loadingDialog.open()
      this.currenciesService
        .create(data)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
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
  }

  public openEditCurrencyDialog(currency: Currency): void {
    const ref = this.dialog.open(EditCurrencyDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: {
        defaultCurrency: this.defaultCurrency,
        currency
      }
    })

    ref.afterClosed().subscribe((data: UpdateCurrencyRequestDto) => {
      if (!data) return

      this.loadingDialog.open()
      this.currenciesService
        .update(data, currency.uuid)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: currency => {
            if (currency.isDefault) {
              this.defaultCurrency = currency
            } else {
              const current = this.currencies.find(c => c.uuid === currency.uuid)
              if (current) {
                current.name = currency.name
                current.code = currency.code
                current.exchangeRate = currency.exchangeRate
              }
            }
            this.notification.notify('Currency updated successfully', 'Close')
          },
          error: err => {
            this.errorDialog.open('Failed to update currency', err.message)
          }
        })
    })
  }

  public openDeleteCurrencyDialog(currency: Currency): void {
    const ref = this.dialog.open(DeleteCurrencyDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: currency
    })

    ref.afterClosed().subscribe((uuid: string) => {
      if (!uuid) return

      this.loadingDialog.open()
      this.currenciesService
        .delete(uuid)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: () => {
            this.notification.notify('Currency deleted successfully', 'Close')
            this.currencies = this.currencies.filter(c => c.uuid !== uuid)
          },
          error: err => {
            this.errorDialog.open('Failed to delete currency', err.message)
          }
        })
    })
  }

  public openSwapDefaultCurrencyDialog(): void {
    const ref = this.dialog.open(SwapDefaultCurrencyDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: {
        currencies: this.currencies,
        defaultCurrency: this.defaultCurrency
      }
    })

    ref.afterClosed().subscribe((uuid: string) => {
      if (!uuid) return

      this.loadingDialog.open()
      this.currenciesService
        .swapDefault(uuid)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: currencies => {
            this.defaultCurrency = currencies.find(c => c.isDefault)
            this.currencies = currencies.filter(c => !c.isDefault)
            this.notification.notify('Default currency swapped successfully', 'Close')
          },
          error: err => {
            this.errorDialog.open('Failed to swap default currency', err.message)
          }
        })
    })
  }
}
