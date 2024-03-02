import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ErrorDialogContentComponent } from './content/error-dialog-content.component'
import { APP_DIALOG_SIZES } from '../../constants/dialog-sizes.constant'

@Component({
  selector: 'shared-components-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {
  public constructor(private readonly dialog: MatDialog) {}

  public open(message: string, details: string): void {
    this.dialog.open(ErrorDialogContentComponent, {
      data: { message, details },
      width: APP_DIALOG_SIZES.md
    })
  }
}
