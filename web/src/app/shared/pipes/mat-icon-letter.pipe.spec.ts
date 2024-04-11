import { MatIconLetterPipe } from './mat-icon-letter.pipe'

describe('Shared/MatIconLetterPipe', () => {
  let pipe: MatIconLetterPipe

  beforeEach(() => {
    pipe = new MatIconLetterPipe()
  })

  it('Should create the pipe', () => {
    expect(pipe).toBeTruthy()
  })

  it('Should return the correct icon based on the string', () => {
    const icon = pipe.transform('John Doe')
    expect(icon).toBe('alpha-j-circle')
  })

  it('Should return the default icon if the string is empty', () => {
    const icon = pipe.transform('')
    expect(icon).toBe('help-circle')
  })

  it('Should return the default icon if the string is undefined', () => {
    const icon = pipe.transform()
    expect(icon).toBe('help-circle')
  })

  it('Should return the default icon if string starts with a non valid letter', () => {
    const icon = pipe.transform('1John Doe')
    expect(icon).toBe('help-circle')
  })
})
