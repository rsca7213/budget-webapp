import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AccountsViewComponent } from './accounts.component'
import { TestingModule } from '../../test/testing.module'

describe('Accounts/AccountsViewComponent', () => {
  let component: AccountsViewComponent
  let fixture: ComponentFixture<AccountsViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsViewComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(AccountsViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
