import { Injectable, signal } from '@angular/core'
import { AuthUserResponseDto } from '../dto/users/responses/auth-user.dto'
import { HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: AuthUserResponseDto | null = null

  public isUserAuthenticated = signal<boolean>(false)

  public constructor(private readonly httpClient: HttpClient) {}

  public async getAuthUser(): Promise<AuthUserResponseDto | null> {
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

  private async getUser(): Promise<AuthUserResponseDto | null> {
    const request = this.httpClient.get<AuthUserResponseDto>('/users/login')

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

  private refreshUserStatus(): void {
    this.isUserAuthenticated.set(!!this.user)
  }
}
