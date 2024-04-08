import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { AccountsViewComponent } from './accounts.component'

describe('Accounts/AccountsViewComponent', () => {
  let component: AccountsViewComponent
  let fixture: ComponentFixture<AccountsViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsViewComponent],
      imports: [SharedModule, HttpClientTestingModule]
    })

    fixture = TestBed.createComponent(AccountsViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
