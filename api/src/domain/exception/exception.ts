import { ExceptionReason, exceptionReasons } from '../types/exception-reason.types'

export class Exception {
  private message: string
  private reason: ExceptionReason
  private origin: string

  private constructor(message: string, reason: ExceptionReason, origin: string) {
    this.message = message
    this.reason = reason
    this.origin = origin
  }

  public static throw(message: string, origin: string, reason: ExceptionReason): void {
    const reasons = exceptionReasons

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

  public getMessage(): string {
    return this.message
  }

  public getDetails(): string {
    return `[${this.reason} / ${this.origin}] ${this.message}`
  }

  public getReason(): ExceptionReason {
    return this.reason
  }
}
