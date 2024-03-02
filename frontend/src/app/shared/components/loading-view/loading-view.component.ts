import { Component, Input } from '@angular/core'
import { LoadingState } from '../../types/loading-state.types'
import { Router } from '@angular/router'

@Component({
  selector: 'shared-components-loading-view',
  templateUrl: './loading-view.component.html',
  styleUrl: './loading-view.component.scss'
})
export class LoadingViewComponent {
  @Input() public view: string
  @Input() public state: LoadingState

  public constructor(public readonly router: Router) {}

  public navigateToHome(): void {
    this.router.navigate(['/'])
  }

  public reload(): void {
    window.location.reload()
  }
}
