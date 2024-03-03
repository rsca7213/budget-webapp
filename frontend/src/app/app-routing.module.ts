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
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    title: 'Login',
    icon: 'login'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    title: 'Register',
    icon: 'account-plus'
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    title: 'Forgot Password',
    icon: 'lock-question'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
