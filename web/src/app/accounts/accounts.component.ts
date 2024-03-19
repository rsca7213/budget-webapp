import { Component } from '@angular/core'
import { LoadingState } from '../shared/types/loading-state.types'

@Component({
  selector: 'accounts-view',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsView {
  public viewState: LoadingState = 'loading'
}
