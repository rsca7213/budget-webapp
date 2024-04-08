import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { APP_PROPERTIES } from '../../../properties'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  public excludePaths = ['mdi.svg']

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.excludePaths.some(path => req.url.includes(path))) return next.handle(req)

    const modifiedReq = req.clone({ url: `${APP_PROPERTIES.api}${req.url}`, withCredentials: true })
    return next.handle(modifiedReq)
  }
}
