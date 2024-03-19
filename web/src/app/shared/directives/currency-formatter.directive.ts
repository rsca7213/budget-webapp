import { Directive, ElementRef, HostListener } from '@angular/core'
import { NgControl } from '@angular/forms'

@Directive({
  selector: '[directivesCurrencyFormatter]'
})
export class CurrencyFormatterDirective {
  public constructor(
    private el: ElementRef,
    private ngControl: NgControl
  ) {}

  @HostListener('input', ['$event.target.value'])
  public onInput(value: string) {
    if (value === null) return

    const regex = /^\d*\.?\d{0,6}$/
    if (!regex.test(value)) {
      value = value.slice(0, -1)
    }

    this.el.nativeElement.value = value
    this.ngControl.control?.setValue(value)
  }
}
