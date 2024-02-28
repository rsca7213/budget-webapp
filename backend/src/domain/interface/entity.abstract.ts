export abstract class Entity {
  protected uuid: string
  protected createdAt: Date
  protected updatedAt: Date

  protected constructor(uuid: string, createdAt: Date, updatedAt: Date) {
    this.uuid = uuid
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  public getUuid(): string {
    return this.uuid
  }

  public setUuid(uuid: string): void {
    this.uuid = uuid
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt
  }
}
