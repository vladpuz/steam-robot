import { Steam } from './Steam'
import { Account } from './Account'

export type Middleware<AccountOptions = void> = (
  steam: Steam,
  account: Account<AccountOptions>,
  next: () => Promise<void>
) => Promise<void>
