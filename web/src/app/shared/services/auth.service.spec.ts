import { TestBed } from '@angular/core/testing'
import { AuthService } from './auth.service'
import { HttpTestingController } from '@angular/common/http/testing'
import { AuthUserResponseDto } from '../dto/users/responses/auth-user.dto'
import { HttpStatusCode } from '@angular/common/http'
import { testData } from '../../../test/testing-data'
import { TestingModule } from '../../../test/testing.module'

describe('Shared/AuthService', () => {
  let service: AuthService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [AuthService]
    })

    service = TestBed.inject(AuthService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('Should create the service', () => {
    expect(service).toBeTruthy()
  })

  it('Should start with a null user', () => {
    expect(service.isUserAuthenticated()).toBeFalsy()
  })

  it('Should get the authenticated user by an http request', async () => {
    const promise = service.getAuthUser()

    const req = httpTestingController.expectOne('/users/login')
    expect(req.request.method).toBe('GET')
    expect(req.request.body).toBeNull()

    req.flush(testData.responses.getAuthUser)

    const user: AuthUserResponseDto | null = await promise

    expect(user).toEqual(testData.responses.getAuthUser)
    expect(service.isUserAuthenticated()).toBeTruthy()
  })

  it('Should not set the user if the request fails', async () => {
    const promise = service.getAuthUser()

    const req = httpTestingController.expectOne('/users/login')
    expect(req.request.method).toBe('GET')
    expect(req.request.body).toBeNull()

    req.flush(null, { status: HttpStatusCode.Unauthorized, statusText: 'Unauthorized' })

    const user: AuthUserResponseDto | null = await promise

    expect(user).toBeNull()
    expect(service.isUserAuthenticated()).toBeFalsy()
  })

  it('Should remove the authenticated user', async () => {
    const promise = service.getAuthUser()

    const req = httpTestingController.expectOne('/users/login')
    expect(req.request.method).toBe('GET')
    expect(req.request.body).toBeNull()

    req.flush(testData.responses.getAuthUser)

    const user: AuthUserResponseDto | null = await promise

    expect(user).toEqual(testData.responses.getAuthUser)
    expect(service.isUserAuthenticated()).toBeTruthy()

    service.removeAuthUser()

    expect(service.isUserAuthenticated()).toBeFalsy()
  })
})
