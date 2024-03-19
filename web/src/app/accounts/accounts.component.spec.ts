import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { AccountsView } from './accounts.component'

describe('Accounts/AccountsView', () => {
  let component: AccountsView
  let fixture: ComponentFixture<AccountsView>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsView],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(AccountsView)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
