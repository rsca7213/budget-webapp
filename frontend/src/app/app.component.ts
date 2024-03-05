import { Component, HostListener, OnInit, ViewChild } from '@angular/core'
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav'
import { APP_ROUTES } from './app-routing.module'
import { NavigationStart, Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) public sidenav: MatSidenav

  public sidenavProperties = {
    opened: false,
    mode: 'side' as MatDrawerMode
  }

  public readonly APP_ROUTES = APP_ROUTES
  public displayMainNavigation = true

  public constructor(private readonly router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.displayMainNavigation =
          this.APP_ROUTES.find(route => route.path === event.url.slice(1))?.sidebar ?? false
      }
    })
  }

  public ngOnInit(): void {
    this.toggleSidenavMode(window.innerWidth)
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.toggleSidenavMode(window.innerWidth)
  }

  public toggleSidenav(): void {
    this.sidenav.toggle()
  }

  public closeSidenav(): void {
    this.sidenav.close()
  }

  private toggleSidenavMode(width: number): void {
    this.sidenavProperties.mode = width > 768 ? 'side' : 'over'
  }
}
