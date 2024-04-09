import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SharedModule } from '../../../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { LoadingDialogComponent } from './loading-dialog.component'

describe('Shared/LoadingDialogComponent', () => {
  let component: LoadingDialogComponent
  let fixture: ComponentFixture<LoadingDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoadingDialogComponent],
      imports: [SharedModule, HttpClientTestingModule]
    })

    fixture = TestBed.createComponent(LoadingDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
