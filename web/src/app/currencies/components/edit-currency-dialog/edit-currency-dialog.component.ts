import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Currency } from '../../../shared/models/currency.model'

@Component({
  selector: 'components-edit-currency-dialog',
  templateUrl: './edit-currency-dialog.component.html',
  styleUrl: './edit-currency-dialog.component.scss'
})
export class EditCurrencyDialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    code: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ]),
    exchangeRate: new FormControl<number>(1.0, [Validators.required, Validators.min(0.0001)])
  })

  public constructor(
    private readonly dialogRef: MatDialogRef<EditCurrencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      defaultCurrency: Currency
      currency: Currency
    }
  ) {}

  private resetForm(): void {
    this.form.reset()
    this.form.get('name')?.setValue(this.data.currency.name)
    this.form.get('code')?.setValue(this.data.currency.code)
    this.form.get('exchangeRate')?.setValue(this.data.currency.exchangeRate)
  }

  public editCurrency(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.form.get('exchangeRate')?.setValue(Number(this.form.get('exchangeRate')?.value))
    this.dialogRef.close(this.form.value)
    this.resetForm()
  }

  public closeDialog(): void {
    this.resetForm()
    this.dialogRef.close()
  }

  public hookExchangeRate(): void {
    this.form.get('exchangeRate')?.valueChanges.subscribe((value: string) => {
      if (value === null) return
      // allow numbers, only one dot, and 6 decimals
      const regex = /^\d*\.?\d{0,6}$/
      if (!regex.test(value)) {
        this.form.get('exchangeRate')?.setValue(this.form.get('exchangeRate')?.value.slice(0, -1))
      }
    })
  }

  public ngOnInit(): void {
    this.resetForm()
  }
}
