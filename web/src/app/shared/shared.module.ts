import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularMaterialModule } from '../angular-material.module'
import { LoadingViewComponent } from './components/loading-view/loading-view.component'
import { RouterModule } from '@angular/router'
import { NotificationComponent } from './components/notification/notification.component'
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component'
import { ErrorDialogContentComponent } from './components/error-dialog/content/error-dialog-content.component'
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component'
import { LoadingDialogContentComponent } from './components/loading-dialog/content/loading-dialog-content.component'
import { CurrencyFormatterDirective } from './directives/currency-formatter.directive'

@NgModule({
  declarations: [
    LoadingViewComponent,
    NotificationComponent,
    ErrorDialogComponent,
    ErrorDialogContentComponent,
    LoadingDialogComponent,
    LoadingDialogContentComponent,
    CurrencyFormatterDirective
  ],
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  exports: [
    LoadingViewComponent,
    LoadingDialogComponent,
    LoadingDialogContentComponent,
    NotificationComponent,
    ErrorDialogComponent,
    ErrorDialogContentComponent,
    CurrencyFormatterDirective,
    AngularMaterialModule
  ]
})
export class SharedModule {}
