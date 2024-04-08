import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { ForgotPasswordViewComponent } from './forgot-password.component'

describe('ForgotPassword/ForgotPasswordViewComponent', () => {
  let component: ForgotPasswordViewComponent
  let fixture: ComponentFixture<ForgotPasswordViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordViewComponent],
      imports: [HttpClientTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(ForgotPasswordViewComponent)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
