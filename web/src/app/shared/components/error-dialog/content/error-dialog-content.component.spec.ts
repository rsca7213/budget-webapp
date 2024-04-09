import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SharedModule } from '../../../../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ErrorDialogContentComponent } from './error-dialog-content.component'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

describe('Shared/ErrorDialogContentComponent', () => {
  let component: ErrorDialogContentComponent
  let fixture: ComponentFixture<ErrorDialogContentComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ErrorDialogContentComponent],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })

    fixture = TestBed.createComponent(ErrorDialogContentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
