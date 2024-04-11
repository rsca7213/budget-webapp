import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CategoryCardComponent } from './category-card.component'
import { testData } from '../../../../test/testing-data'
import { TestingModule } from '../../../../test/testing.module'

describe('Categories/CategoryCardComponent', () => {
  let component: CategoryCardComponent
  let fixture: ComponentFixture<CategoryCardComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CategoryCardComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(CategoryCardComponent)
    component = fixture.componentInstance
    component.category = testData.models.categories[0]
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
