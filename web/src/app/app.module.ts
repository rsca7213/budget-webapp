import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { RouterModule } from '@angular/router'
import { AngularMaterialModule } from './angular-material.module'
import { NavbarModule } from './navbar/navbar.module'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ApiInterceptor } from './shared/interceptors/api.interceptor'
import { ErrorInterceptor } from './shared/interceptors/error.interceptor'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    AngularMaterialModule,
    NavbarModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
