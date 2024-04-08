import { HTTP_INTERCEPTORS, HttpClient, HttpStatusCode } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ErrorInterceptor } from './error.interceptor'

describe('Interceptors/ErrorInterceptor', () => {
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    jest.spyOn(console, 'info').mockImplementation()

    TestBed.configureTestingModule({
      providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
      imports: [HttpClientTestingModule]
    })

    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('Should intercept an error response from the api and format the response', () => {
    const errorMessage = 'Some error message'
    const errorDetails = 'Some error details'

    httpClient.get<void>('/test').subscribe({
      error: error => {
        expect(error.message).toEqual(errorMessage)
      }
    })

    const req = httpTestingController.expectOne('/test')
    req.flush(
      {
        message: errorMessage,
        details: errorDetails
      },
      { status: HttpStatusCode.InternalServerError, statusText: 'Internal Server Error' }
    )

    expect(console.info).toHaveBeenCalledWith(
      `%cErrorInterceptor: message: ${errorMessage}, details: ${errorDetails}`,
      'color: coral'
    )
  })

  it('Should intercept a connection error and format the response', () => {
    httpClient.get<void>('/test').subscribe({
      error: error => {
        expect(error.message).toEqual('Could not connect to the server, please try again later.')
      }
    })

    const req = httpTestingController.expectOne('/test')
    req.error(new ProgressEvent(''))
  })

  it('Should redirect to the login page if the response status is 401', () => {
    httpClient.get<void>('/test').subscribe({
      error: () => {
        expect(window.location.href).toEqual('/login')
      }
    })

    const req = httpTestingController.expectOne('/test')
    req.flush('', { status: HttpStatusCode.Unauthorized, statusText: 'Unauthorized' })
  })
})
