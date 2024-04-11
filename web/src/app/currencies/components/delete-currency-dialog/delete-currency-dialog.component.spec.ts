import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { DeleteCurrencyDialogComponent } from './delete-currency-dialog.component'
import { TestingModule } from '../../../../test/testing.module'

describe('Currencies/DeleteCurrencyDialogComponent', () => {
  let component: DeleteCurrencyDialogComponent
  let fixture: ComponentFixture<DeleteCurrencyDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DeleteCurrencyDialogComponent],
      imports: [TestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })

    fixture = TestBed.createComponent(DeleteCurrencyDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
