import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CreateCategoryDialogComponent } from './create-category-dialog.component'
import { MatDialogRef } from '@angular/material/dialog'
import { TestingModule } from '../../../../test/testing.module'

describe('Categories/CreateCategoryDialogComponent', () => {
  let component: CreateCategoryDialogComponent
  let fixture: ComponentFixture<CreateCategoryDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CreateCategoryDialogComponent],
      imports: [TestingModule],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    })

    fixture = TestBed.createComponent(CreateCategoryDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
