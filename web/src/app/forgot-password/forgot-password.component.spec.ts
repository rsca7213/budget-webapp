import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { ForgotPasswordView } from './forgot-password.component'

describe('ForgotPassword/ForgotPasswordView', () => {
  let component: ForgotPasswordView
  let fixture: ComponentFixture<ForgotPasswordView>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordView],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(ForgotPasswordView)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
