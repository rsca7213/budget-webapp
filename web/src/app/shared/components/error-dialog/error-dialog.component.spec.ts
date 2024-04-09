import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SharedModule } from '../../../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ErrorDialogComponent } from './error-dialog.component'

describe('Shared/ErrorDialogComponent', () => {
  let component: ErrorDialogComponent
  let fixture: ComponentFixture<ErrorDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ErrorDialogComponent],
      imports: [SharedModule, HttpClientTestingModule]
    })

    fixture = TestBed.createComponent(ErrorDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
