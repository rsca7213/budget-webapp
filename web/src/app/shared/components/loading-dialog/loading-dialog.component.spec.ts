import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoadingDialogComponent } from './loading-dialog.component'
import { TestingModule } from '../../../../test/testing.module'

describe('Shared/LoadingDialogComponent', () => {
  let component: LoadingDialogComponent
  let fixture: ComponentFixture<LoadingDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoadingDialogComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(LoadingDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
