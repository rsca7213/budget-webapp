import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { APP_PROPERTIES } from '../../../properties'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('mdi.svg')) return next.handle(req)

    const modifiedReq = req.clone({ url: `${APP_PROPERTIES.api}${req.url}`, withCredentials: true })
    return next.handle(modifiedReq)
  }
}
