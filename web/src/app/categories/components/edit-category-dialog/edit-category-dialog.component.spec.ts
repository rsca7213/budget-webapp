import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { EditCategoryDialogComponent } from './edit-category-dialog.component'
import { TestingModule } from '../../../../test/testing.module'

describe('Categories/EditCategoryDialogComponent', () => {
  let component: EditCategoryDialogComponent
  let fixture: ComponentFixture<EditCategoryDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [EditCategoryDialogComponent],
      imports: [TestingModule],
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
