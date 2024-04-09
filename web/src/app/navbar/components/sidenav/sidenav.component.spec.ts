import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SharedModule } from '../../../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SidenavComponent } from './sidenav.component'
import { RouterModule } from '@angular/router'
import { APP_ROUTES } from '../../../app-routing.module'

describe('Shared/SidenavComponent', () => {
  let component: SidenavComponent
  let fixture: ComponentFixture<SidenavComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [SharedModule, HttpClientTestingModule, RouterModule.forRoot(APP_ROUTES)]
    })

    fixture = TestBed.createComponent(SidenavComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
