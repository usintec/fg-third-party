import type { IEnvironmentConfig } from './types'

export const netlifyConfig: IEnvironmentConfig = {
  host: 'ng-ports.netlify.app',
  client_id: 'revassure.admin',
  grant_type: 'password',
  baseUrl: 'https://api.normsmiway.com/revassure'
}
