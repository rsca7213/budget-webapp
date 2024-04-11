import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ErrorDialogComponent } from './error-dialog.component'
import { TestingModule } from '../../../../test/testing.module'

describe('Shared/ErrorDialogComponent', () => {
  let component: ErrorDialogComponent
  let fixture: ComponentFixture<ErrorDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ErrorDialogComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(ErrorDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
