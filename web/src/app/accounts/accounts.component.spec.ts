import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { AccountsViewComponent } from './accounts.component'

describe('Accounts/AccountsViewComponent', () => {
  let component: AccountsViewComponent
  let fixture: ComponentFixture<AccountsViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsViewComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(AccountsViewComponent)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
