import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { RegisterView } from './register.component'

describe('Register/RegisterView', () => {
  let component: RegisterView
  let fixture: ComponentFixture<RegisterView>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterView],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(RegisterView)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
