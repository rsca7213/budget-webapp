import { Component } from '@angular/core'
import { LoadingState } from '../shared/types/loading-state.types'

@Component({
  selector: 'views-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeViewComponent {
  public viewState: LoadingState = 'loading'
}
