import { type Steam } from './Steam.js'
import { type Account } from './Account.js'

export type Middleware<T = Record<string, unknown>> = (
  steam: Steam,
  account: Account<T>,
  next: () => Promise<void>
) => Promise<void>
