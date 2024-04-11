import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { EditCurrencyDialogComponent } from './edit-currency-dialog.component'
import { testData } from '../../../../test/testing-data'
import { TestingModule } from '../../../../test/testing.module'

describe('Currencies/EditCurrencyDialogComponent', () => {
  let component: EditCurrencyDialogComponent
  let fixture: ComponentFixture<EditCurrencyDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [EditCurrencyDialogComponent],
      imports: [TestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })

    fixture = TestBed.createComponent(EditCurrencyDialogComponent)
    component = fixture.componentInstance
    // @ts-expect-error - data is a property that needs to be injected, test mocks this injection
    component.data = {
      defaultCurrency: testData.models.currencies[0],
      currency: testData.models.currencies[1]
    }
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
