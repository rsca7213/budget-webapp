import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoginDto } from '../dto/users/login.dto'
import { CreateUserDto } from '../dto/users/create-user.dto'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public constructor(private readonly httpClient: HttpClient) {}

  public login(data: LoginDto): Observable<void> {
    return this.httpClient.post<void>('/users/login', data)
  }

  public register(data: CreateUserDto): Observable<void> {
    return this.httpClient.post<void>('/users', data)
  }

  public logout(): Observable<void> {
    return this.httpClient.post<void>('/users/logout', {})
  }
}
