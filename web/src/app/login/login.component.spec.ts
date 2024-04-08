import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoginViewComponent } from './login.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'

describe('Login/LoginViewComponent', () => {
  let component: LoginViewComponent
  let fixture: ComponentFixture<LoginViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginViewComponent],
      imports: [HttpClientTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(LoginViewComponent)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
