import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { authGuard } from './shared/guards/auth.guard'
import { nonAuthGuard } from './shared/guards/non-auth.guard'
import { authResolver } from './shared/resolvers/auth.resolver'

export const APP_ROUTES: (Route & { title: string; icon: string; sidebar: boolean })[] = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    title: 'Home',
    icon: 'home',
    sidebar: true,
    canActivate: [authGuard],
    resolve: { user: authResolver }
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    title: 'Categories',
    icon: 'shape',
    sidebar: true,
    canActivate: [authGuard],
    resolve: { user: authResolver }
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
    title: 'Accounts',
    icon: 'bank',
    sidebar: true,
    canActivate: [authGuard],
    resolve: { user: authResolver }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    title: 'Login',
    icon: 'login',
    sidebar: false,
    canActivate: [nonAuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    title: 'Register',
    icon: 'account-plus',
    sidebar: false,
    canActivate: [nonAuthGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    title: 'Forgot Password',
    icon: 'lock-question',
    sidebar: false,
    canActivate: [nonAuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
