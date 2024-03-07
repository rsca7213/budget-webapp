import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Currency } from '../../../shared/models/currency.model'

@Component({
  selector: 'currencies-components-create-currency-dialog',
  templateUrl: './create-currency-dialog.component.html',
  styleUrl: './create-currency-dialog.component.scss'
})
export class CreateCurrencyDialogComponent implements OnInit {
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
    private readonly dialogRef: MatDialogRef<CreateCurrencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly defaultCurrency: Currency
  ) {}

  private resetForm(): void {
    this.form.reset()
    this.form.get('exchangeRate')?.setValue(1.0)
  }

  public createCurrency(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.dialogRef.close(this.form.value)
    this.resetForm()
  }

  public closeDialog(): void {
    this.resetForm()
    this.dialogRef.close()
  }

  public hookExchangeRate(): void {
    this.form.get('exchangeRate')?.valueChanges.subscribe((value: string) => {
      // allow numbers, only one dot, and 4 decimals
      const regex = /^\d*\.?\d{0,4}$/
      if (!regex.test(value)) {
        this.form.get('exchangeRate')?.setValue(this.form.get('exchangeRate')?.value.slice(0, -1))
      }
    })
  }

  public ngOnInit(): void {
    this.hookExchangeRate()
  }
}
