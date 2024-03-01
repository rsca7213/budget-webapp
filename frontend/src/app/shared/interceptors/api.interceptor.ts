import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { APP_PROPERTIES } from '../../../properties'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('mdi.svg')) return next.handle(req)

    const modifiedReq = req.clone({ url: `${APP_PROPERTIES.api}${req.url}` })
    return next.handle(modifiedReq)
  }
}
