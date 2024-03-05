import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'

export const APP_ROUTES: (Route & { title: string; icon: string; sidebar: boolean })[] = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    title: 'Home',
    icon: 'home',
    sidebar: true,
    canActivate: []
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    title: 'Categories',
    icon: 'shape',
    sidebar: true,
    canActivate: []
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    title: 'Login',
    icon: 'login',
    sidebar: false,
    canActivate: []
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    title: 'Register',
    icon: 'account-plus',
    sidebar: false,
    canActivate: []
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    title: 'Forgot Password',
    icon: 'lock-question',
    sidebar: false,
    canActivate: []
  }
]

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
