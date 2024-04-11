import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NavbarComponent } from './navbar.component'
import { TestingModule } from '../../../../test/testing.module'

describe('Shared/NavbarComponent', () => {
  let component: NavbarComponent
  let fixture: ComponentFixture<NavbarComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [TestingModule]
    })

    fixture = TestBed.createComponent(NavbarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
