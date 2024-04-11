import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoadingDialogContentComponent } from './loading-dialog-content.component'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { TestingModule } from '../../../../../test/testing.module'

describe('Shared/LoadingDialogContentComponent', () => {
  let component: LoadingDialogContentComponent
  let fixture: ComponentFixture<LoadingDialogContentComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoadingDialogContentComponent],
      imports: [TestingModule],
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
