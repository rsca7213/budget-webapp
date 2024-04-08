import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { authGuard } from './shared/guards/auth.guard'
import { nonAuthGuard } from './shared/guards/non-auth.guard'
import { authResolver } from './shared/resolvers/auth.resolver'
import { APP_PROPERTIES } from '../properties'

export const APP_ROUTES: (Route & { title: string; icon: string; sidebarTitle?: string })[] = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    title: `${APP_PROPERTIES.title} - Dashboard`,
    sidebarTitle: 'Dashboard',
    icon: 'home',
    canActivate: [authGuard],
    resolve: { user: authResolver }
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    title: `${APP_PROPERTIES.title} - Categories`,
    sidebarTitle: 'Categories',
    icon: 'shape',
    canActivate: [authGuard],
    resolve: { user: authResolver }
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
    title: `${APP_PROPERTIES.title} - Accounts`,
    sidebarTitle: 'Accounts',
    icon: 'bank',
    canActivate: [authGuard],
    resolve: { user: authResolver }
  },
  {
    path: 'currencies',
    loadChildren: () => import('./currencies/currencies.module').then(m => m.CurrenciesModule),
    title: `${APP_PROPERTIES.title} - Currencies`,
    sidebarTitle: 'Currencies',
    icon: 'currency-usd',
    canActivate: [authGuard],
    resolve: { user: authResolver }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    title: `${APP_PROPERTIES.title} - Login`,
    icon: 'login',
    canActivate: [nonAuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    title: `${APP_PROPERTIES.title} - Register`,
    icon: 'account-plus',
    canActivate: [nonAuthGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    title: `${APP_PROPERTIES.title} - Forgot Password`,
    icon: 'lock-question',
    canActivate: [nonAuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
