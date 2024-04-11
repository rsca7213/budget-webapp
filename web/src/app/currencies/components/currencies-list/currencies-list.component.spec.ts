import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CurrenciesListComponent } from './currencies-list.component'
import { TestingModule } from '../../../../test/testing.module'

describe('Currencies/CurrenciesListComponent', () => {
  let component: CurrenciesListComponent
  let fixture: ComponentFixture<CurrenciesListComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CurrenciesListComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(CurrenciesListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
