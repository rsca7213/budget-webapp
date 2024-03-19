import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { CategoriesView } from './categories.component'

describe('Categories/CategoriesView', () => {
  let component: CategoriesView
  let fixture: ComponentFixture<CategoriesView>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesView],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(CategoriesView)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
