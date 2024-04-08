import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RegisterViewComponent } from './register.component'
import { SharedModule } from '../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'

describe('Register/RegisterViewComponent', () => {
  let component: RegisterViewComponent
  let fixture: ComponentFixture<RegisterViewComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [RegisterViewComponent],
      imports: [SharedModule, HttpClientTestingModule, ReactiveFormsModule]
    })

    fixture = TestBed.createComponent(RegisterViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
