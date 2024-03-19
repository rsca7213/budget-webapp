import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoginView } from './login.component'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'

describe('Login/LoginView', () => {
  let component: LoginView
  let fixture: ComponentFixture<LoginView>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginView],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(LoginView)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
