import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { HomeViewComponent } from './home.component'

describe('Home/HomeViewComponent', () => {
  let component: HomeViewComponent
  let fixture: ComponentFixture<HomeViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeViewComponent],
      imports: [SharedModule, HttpClientTestingModule]
    })

    fixture = TestBed.createComponent(HomeViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
