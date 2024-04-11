import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DeleteCategoryDialogComponent } from './delete-category-dialog.component'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { TestingModule } from '../../../../test/testing.module'

describe('Categories/DeleteCategoryDialogComponent', () => {
  let component: DeleteCategoryDialogComponent
  let fixture: ComponentFixture<DeleteCategoryDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DeleteCategoryDialogComponent],
      imports: [TestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })

    fixture = TestBed.createComponent(DeleteCategoryDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
