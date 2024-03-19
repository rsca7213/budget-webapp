export interface IValidator<T> {
  validateRequired(value: T): boolean
}
