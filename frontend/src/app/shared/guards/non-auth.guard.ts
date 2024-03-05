import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'

export const nonAuthGuard: CanActivateFn = async () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const user = await authService.getAuthUser()

  if (user) {
    router.navigate(['/'])
    return false
  }

  return true
}
