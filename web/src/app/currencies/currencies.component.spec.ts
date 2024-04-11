import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CurrenciesViewComponent } from './currencies.component'
import { TestingModule } from '../../test/testing.module'

describe('Currencies/CurrenciesViewComponent', () => {
  let component: CurrenciesViewComponent
  let fixture: ComponentFixture<CurrenciesViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrenciesViewComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(CurrenciesViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
