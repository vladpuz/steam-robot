import { type Steam } from './Steam.js'
import { type Account } from './Account.js'

export type Starter<AccountOptions = void> = (
  steam: Steam,
  account: Account<AccountOptions>
) => Promise<void>
