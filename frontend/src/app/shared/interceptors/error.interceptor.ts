import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { APP_PROPERTIES } from '../../../properties'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error('Could not connect to the server, please try again later.'))
    } else {
      if (APP_PROPERTIES.debug)
        console.log('ErrorInterceptor', 'message:', error.error.message, 'details:', error.error.details)
      return throwError(() => new Error(error.error.message))
    }
  }
}
