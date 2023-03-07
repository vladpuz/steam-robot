import type SteamTotp from 'steam-totp'
import type SteamUser from 'steam-user'
import type SteamCommunity from 'steamcommunity'
// @ts-expect-error import
import type SteamTradeOfferManager from 'steam-tradeoffer-manager'
import type SteamMarket from 'steam-market'

export interface Steam {
  totp: typeof SteamTotp
  client: SteamUser
  community: SteamCommunity
  manager: typeof SteamTradeOfferManager
  market: SteamMarket
}
