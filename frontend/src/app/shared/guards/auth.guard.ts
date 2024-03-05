import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const user = await authService.getAuthUser()

  if (!user) {
    router.navigate(['/login'])
    return false
  }

  return true
}
