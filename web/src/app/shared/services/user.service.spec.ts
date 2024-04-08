import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { UserService } from './user.service'
import { TestBed } from '@angular/core/testing'
import { testData } from '../../../test/testing-data'

describe('Services/UserService', () => {
  let service: UserService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    })

    service = TestBed.inject(UserService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('Should create the service', () => {
    expect(service).toBeTruthy()
  })

  it('Should execute the api login request', async () => {
    service.login(testData.requests.login).subscribe()

    const req = httpTestingController.expectOne('/users/login')
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual(testData.requests.login)

    req.flush({})
  })

  it('Should execute the api register request', async () => {
    service.register(testData.requests.createUser).subscribe()

    const req = httpTestingController.expectOne('/users')
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual(testData.requests.createUser)

    req.flush({})
  })

  it('Should execute the api logout request', async () => {
    service.logout().subscribe()

    const req = httpTestingController.expectOne('/users/logout')
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({})

    req.flush({})
  })

  it('Should determine password strength correctly', () => {
    const passwords = ['pass', 'Pass', 'Pass1', 'Pass1*', 'Password123*']

    const strengths = passwords.map(password => service.determinePasswordStrength(password))

    expect(strengths).toEqual([20, 40, 60, 80, 100])
  })
})
