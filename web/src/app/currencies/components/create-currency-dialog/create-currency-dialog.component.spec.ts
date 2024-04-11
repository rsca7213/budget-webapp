import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { CreateCurrencyDialogComponent } from './create-currency-dialog.component'
import { TestingModule } from '../../../../test/testing.module'

describe('Currencies/CreateCurrencyDialogComponent', () => {
  let component: CreateCurrencyDialogComponent
  let fixture: ComponentFixture<CreateCurrencyDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CreateCurrencyDialogComponent],
      imports: [TestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })

    fixture = TestBed.createComponent(CreateCurrencyDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
