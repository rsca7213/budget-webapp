import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { APP_ROUTES } from './app-routing.module'
import { TestingModule } from '../test/testing.module'

describe('App/AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [TestingModule, RouterModule.forRoot(APP_ROUTES)]
    })

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Should create the component', () => {
    expect(component).toBeTruthy()
  })
})
