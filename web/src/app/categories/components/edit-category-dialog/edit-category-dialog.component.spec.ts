import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SharedModule } from '../../../shared/shared.module'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { EditCategoryDialogComponent } from './edit-category-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'

describe('Categories/EditCategoryDialogComponent', () => {
  let component: EditCategoryDialogComponent
  let fixture: ComponentFixture<EditCategoryDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [EditCategoryDialogComponent],
      imports: [SharedModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })

    fixture = TestBed.createComponent(EditCategoryDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
