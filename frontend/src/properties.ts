import { environment } from './environments/environment'

const LOCAL_APP_PROPERTIES = {
  title: 'Budget WebApp',
  api: 'http://localhost:3000/api'
}
const PRODUCTION_APP_PROPERTIES = {
  title: 'Budget WebApp',
  api: ''
}

interface _APP_PROPERTIES {
  title: string
  api: string
}

export const APP_PROPERTIES: _APP_PROPERTIES =
  environment === 'production' ? PRODUCTION_APP_PROPERTIES : LOCAL_APP_PROPERTIES
