import { Steam } from './Steam.js'
import { Account } from './Account.js'

export type HandleStart<AccountOptions = void> = (
  steam: Steam,
  account: Account<AccountOptions>
) => Promise<void>
