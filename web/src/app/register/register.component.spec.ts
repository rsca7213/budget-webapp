import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RegisterViewComponent } from './register.component'
import { TestingModule } from '../../test/testing.module'

describe('Register/RegisterViewComponent', () => {
  let component: RegisterViewComponent
  let fixture: ComponentFixture<RegisterViewComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [RegisterViewComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(RegisterViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
