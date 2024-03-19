import { ResolveFn } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'
import { AuthUserDto } from '../dto/users/auth-user.dto'

export const authResolver: ResolveFn<AuthUserDto | null> = async () => {
  const authService = inject(AuthService)
  return await authService.getAuthUser()
}
