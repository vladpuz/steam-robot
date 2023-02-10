import { type Steam } from './Steam.js'
import { type Account } from './Account.js'

export type Middleware<AccountOptions = void> = (
  steam: Steam,
  account: Account<AccountOptions>,
  next: () => Promise<void>
) => Promise<void>
