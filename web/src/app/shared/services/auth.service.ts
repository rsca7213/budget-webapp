import { Injectable } from '@angular/core'
import { AuthUserDto } from '../dto/users/auth-user.dto'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: AuthUserDto | null = null

  private serviceLoaded = new BehaviorSubject<boolean>(false)
  public serviceLoadedObservable: Observable<boolean> = this.serviceLoaded.asObservable()

  public constructor(private readonly httpClient: HttpClient) {}

  public async getAuthUser(): Promise<AuthUserDto | null> {
    if (!this.user) {
      this.user = await this.getUser()
      this.serviceLoaded.next(true)
    }
    return this.user
  }

  public isAuthenticated(): boolean {
    return !!this.user
  }

  public removeAuthUser(): void {
    this.user = null
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
}
