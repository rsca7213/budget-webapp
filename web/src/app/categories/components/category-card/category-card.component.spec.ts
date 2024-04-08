import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CategoryCardComponent } from './category-card.component'
import { SharedModule } from '../../../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { testData } from '../../../../test/testing-data'

describe('Categories/CategoryCardComponent', () => {
  let component: CategoryCardComponent
  let fixture: ComponentFixture<CategoryCardComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CategoryCardComponent],
      imports: [SharedModule, HttpClientTestingModule]
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
