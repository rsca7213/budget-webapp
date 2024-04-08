import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SharedModule } from '../../../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CreateCategoryDialogComponent } from './create-category-dialog.component'
import { MatDialogRef } from '@angular/material/dialog'
import { ReactiveFormsModule } from '@angular/forms'

describe('Categories/CreateCategoryDialogComponent', () => {
  let component: CreateCategoryDialogComponent
  let fixture: ComponentFixture<CreateCategoryDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CreateCategoryDialogComponent],
      imports: [SharedModule, HttpClientTestingModule, ReactiveFormsModule],
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
