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
      imports: [SharedModule, HttpClientTestingModule]
    })

    fixture = TestBed.createComponent(CategoriesViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
