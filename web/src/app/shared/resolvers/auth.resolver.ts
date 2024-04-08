import { ResolveFn } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'
import { AuthUserResponseDto } from '../dto/users/responses/auth-user.dto'

export const authResolver: ResolveFn<AuthUserResponseDto | null> = async () => {
  const authService = inject(AuthService)
  return await authService.getAuthUser()
}
