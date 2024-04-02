import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { CurrenciesViewComponent } from './currencies.component'

describe('Currencies/CurrenciesViewComponent', () => {
  let component: CurrenciesViewComponent
  let fixture: ComponentFixture<CurrenciesViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrenciesViewComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(CurrenciesViewComponent)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
