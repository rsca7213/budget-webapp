import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SharedModule } from '../../../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CurrencyExchangeRatesListComponent } from './currency-exchange-rates-list.component'

describe('Currencies/CurrencyExchangeRatesListComponent', () => {
  let component: CurrencyExchangeRatesListComponent
  let fixture: ComponentFixture<CurrencyExchangeRatesListComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CurrencyExchangeRatesListComponent],
      imports: [SharedModule, HttpClientTestingModule]
    })

    fixture = TestBed.createComponent(CurrencyExchangeRatesListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
