import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SharedModule } from '../../../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { LoadingViewComponent } from './loading-view.component'

describe('Shared/LoadingViewComponent', () => {
  let component: LoadingViewComponent
  let fixture: ComponentFixture<LoadingViewComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoadingViewComponent],
      imports: [SharedModule, HttpClientTestingModule]
    })

    fixture = TestBed.createComponent(LoadingViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
