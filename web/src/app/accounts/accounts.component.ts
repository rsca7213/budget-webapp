import { Component } from '@angular/core'
import { LoadingState } from '../shared/types/loading-state.types'

@Component({
  selector: 'views-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsViewComponent {
  public viewState: LoadingState = 'loading'
}
