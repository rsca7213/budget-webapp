import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoginViewComponent } from './login.component'
import { TestingModule } from '../../test/testing.module'

describe('Login/LoginViewComponent', () => {
  let component: LoginViewComponent
  let fixture: ComponentFixture<LoginViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginViewComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(LoginViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
