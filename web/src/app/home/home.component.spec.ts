import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HomeViewComponent } from './home.component'
import { TestingModule } from '../../test/testing.module'

describe('Home/HomeViewComponent', () => {
  let component: HomeViewComponent
  let fixture: ComponentFixture<HomeViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeViewComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(HomeViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
