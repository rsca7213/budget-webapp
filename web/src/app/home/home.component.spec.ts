import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { HomeViewComponent } from './home.component'

describe('Home/HomeViewComponent', () => {
  let component: HomeViewComponent
  let fixture: ComponentFixture<HomeViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeViewComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(HomeViewComponent)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
