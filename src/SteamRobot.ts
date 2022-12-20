import request, { Request } from 'request'
import SteamTotp from 'steam-totp'
import SteamUser from 'steam-user'
import SteamCommunity from 'steamcommunity'
import SteamTradeOfferManager from 'steam-tradeoffer-manager'
import SteamMarket from 'steam-market'
import { Account } from './types/Account.js'
import { Middleware } from './types/Middleware.js'
import { Starter } from './types/Starter.js'

class SteamRobot<AccountOptions = void> {
  private readonly account: Account<AccountOptions>
  private readonly middlewares: Array<Middleware<AccountOptions>> = []

  public constructor (account: Account<AccountOptions>) {
    this.account = account
  }

  public use (middleware: Middleware<AccountOptions>): void {
    this.middlewares.push(middleware)
  }

  public async start (interval: number, starter?: Starter<AccountOptions> | null): Promise<void> {
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

    const callMiddlewares = async (): Promise<void> => {
      let index = 0

      const next = async (): Promise<void> => {
        index += 1

        if (this.middlewares[index] == null) {
          return
        }

        await this.middlewares[index](steam, this.account, next)
      }

      await this.middlewares[index](steam, this.account, next)
      setTimeout(callMiddlewares as () => void, interval)
    }

    if (starter != null) {
      await starter(steam, this.account)
    }

    setTimeout(callMiddlewares as () => void)
  }
}

export default SteamRobot
