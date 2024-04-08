import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CurrencyFormatterDirective } from './currency-formatter.directive'
import { Component, DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  template: `<form [formGroup]="form">
    <input type="text" directivesCurrencyFormatter formControlName="test" />
  </form>`
})
class TestComponent {
  public form = new FormGroup({
    test: new FormControl<string>('')
  })
}

describe('Shared/CurrencyFormatterDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let input: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [CurrencyFormatterDirective, TestComponent]
    })

    fixture = TestBed.createComponent(TestComponent)
    input = fixture.debugElement.query(By.css('input'))
  })

  it('Should successfully remove input character if its more than 6 decimals', () => {
    input.nativeElement.value = '123.1234567'
    input.triggerEventHandler('input', { target: input.nativeElement })
    expect(input.nativeElement.value).toBe('123.123456')
  })

  it('Should successfully remove input character if its not a number', () => {
    input.nativeElement.value = '123.12a'
    input.triggerEventHandler('input', { target: input.nativeElement })
    expect(input.nativeElement.value).toBe('123.12')
  })

  it('Should not modify the input if its a valid number', () => {
    input.nativeElement.value = '123.123456'
    input.triggerEventHandler('input', { target: input.nativeElement })
    expect(input.nativeElement.value).toBe('123.123456')
  })

  it('Should not modify the input if its a valid number without decimals', () => {
    input.nativeElement.value = '123'
    input.triggerEventHandler('input', { target: input.nativeElement })
    expect(input.nativeElement.value).toBe('123')
  })
})
