export interface IRepository<T> {
  save(entity: T): void

  find(uuid: string): T | undefined

  findAll(): T[]

  delete(uuid: string): void
}
