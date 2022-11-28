export interface Account<AccountOptions = void> {
  username: string
  password: string
  sharedSecret: string
  identitySecret: string
  options?: AccountOptions | null
  headers?: Record<string, string>
  proxy?: string | null
}
