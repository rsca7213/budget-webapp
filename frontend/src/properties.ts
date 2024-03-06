import { environment } from './environments/environment'

const LOCAL_APP_PROPERTIES = {
  debug: true,
  title: 'Budget WebApp',
  icon: 'piggy-bank',
  api: 'http://localhost:3000/api'
}
const PRODUCTION_APP_PROPERTIES = {
  debug: false,
  title: 'Budget WebApp',
  icon: 'piggy-bank',
  api: ''
}

interface _APP_PROPERTIES {
  debug: boolean
  title: string
  icon: string
  api: string
}

export const APP_PROPERTIES: _APP_PROPERTIES =
  environment === 'production' ? PRODUCTION_APP_PROPERTIES : LOCAL_APP_PROPERTIES
