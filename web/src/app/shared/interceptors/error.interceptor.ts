import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { APP_PROPERTIES } from '../../../properties'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error('Could not connect to the server, please try again later.'))
    } else {
      if (!error.url?.includes('/login') && error.status === 401) {
        window.location.href = '/login'
      }
      if (APP_PROPERTIES.debug)
        console.log(
          'ErrorInterceptor',
          'message:',
          error.error.message,
          'details:',
          error.error.details
        )
      return throwError(() => new Error(error.error.message))
    }
  }
}
