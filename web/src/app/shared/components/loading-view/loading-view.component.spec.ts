import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoadingViewComponent } from './loading-view.component'
import { TestingModule } from '../../../../test/testing.module'

describe('Shared/LoadingViewComponent', () => {
  let component: LoadingViewComponent
  let fixture: ComponentFixture<LoadingViewComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoadingViewComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(LoadingViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
