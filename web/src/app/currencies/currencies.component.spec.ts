import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { CurrenciesView } from './currencies.component'

describe('Currencies/CurrenciesView', () => {
  let component: CurrenciesView
  let fixture: ComponentFixture<CurrenciesView>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrenciesView],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(CurrenciesView)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
