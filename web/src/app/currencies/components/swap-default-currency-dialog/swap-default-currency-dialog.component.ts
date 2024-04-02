import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Currency } from '../../../shared/models/currency.model'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CurrenciesService } from '../../../shared/services/currencies.service'
import { ExchangeRate } from '../../../shared/types/exchange-rate.interface'

@Component({
  selector: 'components-swap-default-currency-dialog',
  templateUrl: './swap-default-currency-dialog.component.html',
  styleUrl: './swap-default-currency-dialog.component.scss'
})
export class SwapDefaultCurrencyDialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    currency: new FormControl<Currency>({} as Currency, [Validators.required])
  })

  public exchangeRates: ExchangeRate[] = []

  public constructor(
    private readonly dialogRef: MatDialogRef<SwapDefaultCurrencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      currencies: Currency[]
      defaultCurrency: Currency
    },
    private readonly currenciesService: CurrenciesService
  ) {}

  public ngOnInit(): void {
    this.resetForm()

    this.form.get('currency')?.valueChanges.subscribe(() => {
      this.recalculateExchangeRates()
    })
  }

  public swap(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.dialogRef.close(this.form.get('currency')?.value.uuid)
    this.resetForm()
  }

  public closeDialog(): void {
    this.dialogRef.close()
    this.resetForm()
  }

  private resetForm(): void {
    this.form.reset()
    this.form.get('currency')?.setValue(this.data.currencies[0])
    this.recalculateExchangeRates()
  }

  private recalculateExchangeRates(): void {
    const newDefaultCurrency = this.form.get('currency')?.value
    if (!newDefaultCurrency) return
    this.exchangeRates = this.currenciesService.calculateSwappedExchangeRates(
      this.data.defaultCurrency,
      newDefaultCurrency,
      this.data.currencies.filter(currency => currency.uuid !== newDefaultCurrency.uuid)
    )
  }
}
