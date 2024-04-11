import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CategoriesViewComponent } from './categories.component'
import { TestingModule } from '../../test/testing.module'

describe('Categories/CategoriesViewComponent', () => {
  let component: CategoriesViewComponent
  let fixture: ComponentFixture<CategoriesViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesViewComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(CategoriesViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
