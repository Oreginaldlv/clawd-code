import type { Command } from '../../commands.js'
import { hasSplinterworksApiKeyAuth } from '../../utils/auth.js'
import { isEnvTruthy } from '../../utils/envUtils.js'

export default () =>
  ({
    type: 'local-jsx',
    name: 'login',
    description: hasSplinterworksApiKeyAuth()
      ? 'Switch Splinterworks accounts'
      : 'Sign in with your Splinterworks account',
    isEnabled: () => !isEnvTruthy(process.env.DISABLE_LOGIN_COMMAND),
    load: () => import('./login.js'),
  }) satisfies Command
