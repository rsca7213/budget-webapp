import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { SwapDefaultCurrencyDialogComponent } from './swap-default-currency-dialog.component'
import { CurrencyExchangeRatesListComponent } from '../currency-exchange-rates-list/currency-exchange-rates-list.component'
import { testData } from '../../../../test/testing-data'
import { TestingModule } from '../../../../test/testing.module'

describe('Currencies/SwapDefaultCurrencyDialogComponent', () => {
  let component: SwapDefaultCurrencyDialogComponent
  let fixture: ComponentFixture<SwapDefaultCurrencyDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SwapDefaultCurrencyDialogComponent, CurrencyExchangeRatesListComponent],
      imports: [TestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })

    fixture = TestBed.createComponent(SwapDefaultCurrencyDialogComponent)
    component = fixture.componentInstance
    // @ts-expect-error - data is a property that needs to be injected, test mocks this injection
    component.data = {
      currencies: testData.models.currencies,
      defaultCurrency: testData.models.currencies[0]
    }
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
