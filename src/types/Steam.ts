import SteamTotp from 'steam-totp'
import SteamUser from 'steam-user'
import SteamCommunity from 'steamcommunity'
import SteamTradeOfferManager from 'steam-tradeoffer-manager'
import SteamMarket from 'steam-market'

export interface Steam {
  totp: typeof SteamTotp
  client: SteamUser
  community: SteamCommunity
  manager: typeof SteamTradeOfferManager
  market: SteamMarket
}
