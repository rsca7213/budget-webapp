export class Exception {
  private message: string
  private reason: 'Validation' | 'Verification' | 'Not Found' | 'Generic'
  private origin: string

  private constructor(
    message: string,
    reason: 'Validation' | 'Verification' | 'Not Found' | 'Generic',
    origin: string
  ) {
    this.message = message
    this.reason = reason
    this.origin = origin
  }

  public getMessage(): string {
    return this.message
  }

  public getDetails(): string {
    return `[${this.reason} / ${this.origin}] ${this.message}`
  }

  public static throw(
    message: string,
    origin: string,
    reason: 'Validation' | 'Verification' | 'Not Found' | 'Generic'
  ): void {
    const reasons = ['Validation', 'Verification', 'Not Found', 'Generic']

    if (!message) {
      throw new Error('Exception was not created succesfully, message is required')
    }

    if (!origin) {
      throw new Error('Exception was not created succesfully, origin is required')
    }

    if (!reasons.includes(reason)) {
      throw new Error('Exception was not created succesfully, reason is invalid')
    }

    throw new Exception(message, reason, origin)
  }
}
