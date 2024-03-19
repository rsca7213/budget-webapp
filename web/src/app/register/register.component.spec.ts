import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { RegisterViewComponent } from './register.component'

describe('Register/RegisterViewComponent', () => {
  let component: RegisterViewComponent
  let fixture: ComponentFixture<RegisterViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterViewComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(RegisterViewComponent)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
