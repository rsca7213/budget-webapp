import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { ApiInterceptor } from './api.interceptor'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { APP_PROPERTIES } from '../../../properties'

describe('Shared/ApiInterceptor', () => {
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
      imports: [HttpClientTestingModule]
    })

    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('Should intercept a request and add the url', () => {
    httpClient.get<void>('/test').subscribe()
    httpTestingController.expectOne(`${APP_PROPERTIES.api}/test`)
  })

  it('Should not modify the url if it is in the exclude paths', () => {
    httpClient.get<void>(`test/mdi.svg`).subscribe()
    httpTestingController.expectOne(`test/mdi.svg`)
  })
})
