import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { APP_ROUTES } from './app.routes'

const routes: Routes = [
  ...APP_ROUTES.map(route => {
    return {
      path: route.path,
      component: route.component
    }
  }),
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
