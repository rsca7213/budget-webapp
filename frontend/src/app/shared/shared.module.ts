import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularMaterialModule } from '../angular-material.module'
import { LoadingViewComponent } from './components/loading-view/loading-view.component'
import { RouterModule } from '@angular/router'
import { NotificationComponent } from './components/notification/notification.component'
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component'
import { ErrorDialogContentComponent } from './components/error-dialog/content/error-dialog-content.component'

@NgModule({
  declarations: [LoadingViewComponent, NotificationComponent, ErrorDialogComponent, ErrorDialogContentComponent],
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  exports: [LoadingViewComponent, NotificationComponent, ErrorDialogComponent, ErrorDialogContentComponent]
})
export class SharedModule {}
