export interface IRepository<T> {
  save(entity: T): Promise<void>

  find(uuid: string): Promise<T | undefined>

  findAll(): Promise<T[]>

  delete(uuid: string): Promise<void>
}
