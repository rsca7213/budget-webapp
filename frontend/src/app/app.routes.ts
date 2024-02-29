import { CategoriesView } from './categories/categories.component'
import { HomeView } from './home/home.component'

export const APP_ROUTES = [
  {
    path: 'home',
    component: HomeView,
    icon: 'home',
    title: 'Home'
  },
  {
    path: 'categories',
    component: CategoriesView,
    icon: 'label',
    title: 'Categories'
  }
]
