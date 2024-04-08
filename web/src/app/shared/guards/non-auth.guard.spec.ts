import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { testData } from '../../../test/testing-data'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { nonAuthGuard } from './non-auth.guard'

describe('Shared/NonAuthGuard', () => {
  let authService: AuthService
  let router: Router
  const activatedRouteSnapshot = {} as ActivatedRouteSnapshot
  const routerStateSnapshot = {} as RouterStateSnapshot

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService]
    })

    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router)
    jest.spyOn(router, 'navigate')
  })

  it('Should allow access to the route if the user is not authenticated', async () => {
    authService.getAuthUser = jest.fn().mockResolvedValue(null)

    const canActivate = await TestBed.runInInjectionContext(() =>
      nonAuthGuard(activatedRouteSnapshot, routerStateSnapshot)
    )

    expect(router.navigate).not.toHaveBeenCalled()
    expect(canActivate).toBe(true)
  })

  it('Should redirect to the home page if the user is authenticated', async () => {
    authService.getAuthUser = jest.fn().mockResolvedValue(testData.responses.getAuthUser)

    const canActivate = await TestBed.runInInjectionContext(() =>
      nonAuthGuard(activatedRouteSnapshot, routerStateSnapshot)
    )

    expect(router.navigate).toHaveBeenCalledWith(['/'])
    expect(canActivate).toBe(false)
  })
})
