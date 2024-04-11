import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CurrencyExchangeRatesListComponent } from './currency-exchange-rates-list.component'
import { TestingModule } from '../../../../test/testing.module'

describe('Currencies/CurrencyExchangeRatesListComponent', () => {
  let component: CurrencyExchangeRatesListComponent
  let fixture: ComponentFixture<CurrencyExchangeRatesListComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CurrencyExchangeRatesListComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(CurrencyExchangeRatesListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
