import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SharedModule } from '../../../../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { LoadingDialogContentComponent } from './loading-dialog-content.component'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

describe('Shared/LoadingDialogContentComponent', () => {
  let component: LoadingDialogContentComponent
  let fixture: ComponentFixture<LoadingDialogContentComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoadingDialogContentComponent],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })

    fixture = TestBed.createComponent(LoadingDialogContentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
