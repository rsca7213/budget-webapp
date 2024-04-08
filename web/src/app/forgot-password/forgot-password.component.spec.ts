import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ForgotPasswordViewComponent } from './forgot-password.component'

describe('ForgotPassword/ForgotPasswordViewComponent', () => {
  let component: ForgotPasswordViewComponent
  let fixture: ComponentFixture<ForgotPasswordViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordViewComponent]
    })

    fixture = TestBed.createComponent(ForgotPasswordViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
