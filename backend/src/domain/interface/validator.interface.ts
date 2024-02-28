export interface IValidator<T> {
  validate_required(value: T): boolean
}
