import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../shared/shared.module'
import { CategoriesViewComponent } from './categories.component'

describe('Categories/CategoriesViewComponent', () => {
  let component: CategoriesViewComponent
  let fixture: ComponentFixture<CategoriesViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesViewComponent],
      imports: [HttpClientTestingModule, SharedModule]
    })

    fixture = TestBed.createComponent(CategoriesViewComponent)
    component = fixture.componentInstance
  })

  it('Should create the view', () => {
    expect(component).toBeTruthy()
  })
})
