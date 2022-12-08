import { Steam } from './Steam.js'
import { Account } from './Account.js'

export type Middleware<AccountOptions = void> = (
  steam: Steam,
  account: Account<AccountOptions>,
  next: () => Promise<void>
) => Promise<void>
