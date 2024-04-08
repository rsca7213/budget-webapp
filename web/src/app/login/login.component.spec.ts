import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoginViewComponent } from './login.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'

describe('Login/LoginViewComponent', () => {
  let component: LoginViewComponent
  let fixture: ComponentFixture<LoginViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginViewComponent],
      imports: [SharedModule, HttpClientTestingModule, ReactiveFormsModule]
    })

    fixture = TestBed.createComponent(LoginViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
