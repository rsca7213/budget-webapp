import { Entity } from '../interface/entity.abstract'

export class User extends Entity {
  private name: string
  private email: string
  private encrypted_password: string
}
