import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { CurrenciesViewComponent } from './currencies.component'

describe('Currencies/CurrenciesViewComponent', () => {
  let component: CurrenciesViewComponent
  let fixture: ComponentFixture<CurrenciesViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrenciesViewComponent],
      imports: [SharedModule, HttpClientTestingModule]
    })

    fixture = TestBed.createComponent(CurrenciesViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
