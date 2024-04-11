import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NotificationComponent } from './notification.component'
import { TestingModule } from '../../../../test/testing.module'

describe('Shared/NotificationComponent', () => {
  let component: NotificationComponent
  let fixture: ComponentFixture<NotificationComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(NotificationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
