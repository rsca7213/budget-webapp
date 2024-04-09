import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SharedModule } from '../../../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CurrenciesListComponent } from './currencies-list.component'

describe('Currencies/CurrenciesListComponent', () => {
  let component: CurrenciesListComponent
  let fixture: ComponentFixture<CurrenciesListComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CurrenciesListComponent],
      imports: [SharedModule, HttpClientTestingModule]
    })

    fixture = TestBed.createComponent(CurrenciesListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
