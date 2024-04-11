import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'matIconLetter'
})
export class MatIconLetterPipe implements PipeTransform {
  public transform(value?: string): string {
    const letter = value?.charAt(0).toLowerCase()

    if (letter?.match(/[a-z]/)) return `alpha-${letter}-circle`

    return 'help-circle'
  }
}
