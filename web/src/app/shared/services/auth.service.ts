import { Injectable, signal } from '@angular/core'
import { AuthUserDto } from '../dto/users/auth-user.dto'
import { HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: AuthUserDto | null = null

  public isUserAuthenticated = signal<boolean>(false)

  public constructor(private readonly httpClient: HttpClient) {}

  public async getAuthUser(): Promise<AuthUserDto | null> {
    if (!this.user) {
      this.user = await this.getUser()
    }

    this.refreshUserStatus()

    return this.user
  }

  public removeAuthUser(): void {
    this.user = null
    this.refreshUserStatus()
  }

  private async getUser(): Promise<AuthUserDto | null> {
    const request = this.httpClient.get<AuthUserDto>('/users/login')

    return await lastValueFrom(request)
      .then(user => {
        return {
          uuid: user.uuid,
          name: user.name,
          email: user.email
        }
      })
      .catch(() => {
        return null
      })
  }

  public refreshUserStatus(): void {
    this.isUserAuthenticated.set(!!this.user)
  }
}
