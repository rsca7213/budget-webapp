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

  public determinePasswordStrength(password: string): number {
    let strength: number = 0

    // if password length is more or equal than 10
    if (password.length > 10) strength += 20

    // if password has lowercase letters
    if (password.match(/[a-z]/)) strength += 20

    // if password has uppercase letters
    if (password.match(/[A-Z]/)) strength += 20

    // if password has numbers
    if (password.match(/[0-9]/)) strength += 20

    // if password has special characters
    if (password.match(/[^a-zA-Z0-9]/)) strength += 20

    return strength
  }
}
