import request, { type Request } from 'request'
import SteamTotp from 'steam-totp'
import SteamUser from 'steam-user'
import SteamCommunity from 'steamcommunity'
// @ts-expect-error import
import SteamTradeOfferManager from 'steam-tradeoffer-manager'
import SteamMarket from 'steam-market'
import { type Account } from './types/Account.js'
import { type Middleware } from './types/Middleware.js'
import { type Steam } from './types/Steam.js'

class SteamRobot<T = Record<string, unknown>> {
  private timer: ReturnType<typeof setTimeout> | null = null
  private steam: Steam | null = null
  private readonly middlewares: Array<Middleware<T>> = []
  private readonly account: Account<T>

  public constructor (account: Account<T>) {
    this.account = account
  }

  public use (middleware: Middleware<T>): void {
    this.middlewares.push(middleware)
  }

  public async start (delay?: number | null): Promise<Steam> {
    const protocol = this.account.proxy?.split('://')[0] ?? ''
    const isHttp = protocol.startsWith('http')
    const isSocks = protocol.startsWith('socks')

    const client = new SteamUser({
      additionalHeaders: this.account.headers,
      httpProxy: isHttp ? this.account.proxy : null,
      socksProxy: isSocks ? this.account.proxy : null
    })

    const market = new SteamMarket({
      additionalHeaders: this.account.headers,
      httpProxy: isHttp ? this.account.proxy : null,
      socksProxy: isSocks ? this.account.proxy : null
    })

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const community = new SteamCommunity({
      request: request.defaults({
        headers: this.account.headers,
        proxy: (isHttp || isSocks) ? this.account.proxy : null,
        forever: true
      }) as unknown as Request
    } as SteamCommunity.Options)

    const manager = new SteamTradeOfferManager({
      steam: client,
      community
    })

    client.logOn({
      accountName: this.account.username,
      password: this.account.password,
      twoFactorCode: SteamTotp.generateAuthCode(this.account.sharedSecret)
    })

    await Promise.all([
      new Promise<void>((resolve) => {
        client.on('webSession', (sessionId, cookies) => {
          community.setCookies(cookies)
          manager.setCookies(cookies)
          market.setCookies(cookies)
          resolve()
        })
      }),
      new Promise<void>((resolve) => {
        client.on('wallet', (hasWallet, currency) => {
          market.setCurrency(currency)
          resolve()
        })
      }),
      new Promise<void>((resolve) => {
        client.on('accountInfo', (name, country) => {
          market.setCountry(country)
          resolve()
        })
      })
    ])

    market.setVanityURL(client.vanityURL ?? client.steamID?.getSteamID64() ?? '')

    const steam = {
      totp: SteamTotp,
      client,
      community,
      manager,
      market
    }

    this.steam = steam

    const callMiddlewares = async (): Promise<void> => {
      if (this.middlewares.length === 0) {
        return
      }

      let index = 0

      const next = async (): Promise<void> => {
        index += 1

        if (this.middlewares[index] == null) {
          return
        }

        await this.middlewares[index](steam, this.account, next)
      }

      await this.middlewares[index](steam, this.account, next)
      this.timer = setTimeout(callMiddlewares as () => void, delay ?? 60 * 1000)
    }

    setTimeout(callMiddlewares as () => void)
    return steam
  }

  public stop (): void {
    if (this.timer != null) {
      clearTimeout(this.timer)
      this.timer = null
    }

    if (this.steam != null) {
      this.steam.client.logOff()
      this.steam.manager.shutdown()
      this.steam = null
    }
  }
}

export default SteamRobot
