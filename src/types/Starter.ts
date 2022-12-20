import { Steam } from './Steam.js'
import { Account } from './Account.js'

export type Starter<AccountOptions = void> = (
  steam: Steam,
  account: Account<AccountOptions>
) => Promise<void>
