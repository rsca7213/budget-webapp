import { Component } from '@angular/core'
import { LoadingState } from '../shared/types/loading-state.types'

@Component({
  selector: 'home-view',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeView {
  public viewState: LoadingState = 'loading'
}
