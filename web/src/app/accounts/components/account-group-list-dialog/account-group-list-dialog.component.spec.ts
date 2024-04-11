import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AccountGroupListDialogComponent } from './account-group-list-dialog.component'
import { TestingModule } from '../../../../test/testing.module'

describe('Accounts/AccountGroupListDialogComponent', () => {
  let component: AccountGroupListDialogComponent
  let fixture: ComponentFixture<AccountGroupListDialogComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountGroupListDialogComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(AccountGroupListDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
