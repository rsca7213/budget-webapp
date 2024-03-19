import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { HomeView } from './home.component'

describe('Home/HomeView', () => {
  let component: HomeView
  let fixture: ComponentFixture<HomeView>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeView],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(HomeView)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
