export interface Account<T = Record<string, unknown>> {
  username: string
  password: string
  sharedSecret: string
  identitySecret?: string | null
  options?: T | null
  headers?: Record<string, string>
  proxy?: string | null
}
