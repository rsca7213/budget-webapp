import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'

export const APP_ROUTES: (Route & { title: string; icon: string })[] = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    title: 'Home',
    icon: 'home'
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    title: 'Categories',
    icon: 'shape'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
