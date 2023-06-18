# steam-robot

Steam bots creating based on middlewares, that are called indefinitely for a given delay. Internally he uses
modules from the [See also](#see-also) section.

TypeDoc documentation is available on [wiki](https://github.com/vladislav-puzyrev/steam-robot/wiki).

## Install

```bash
npm install steam-robot
```

## Usage

### Middlewares style

```javascript
import SteamRobot from 'steam-robot'

// Account object for creating a bot
const account = {
  // Required properties
  username: 'username',
  password: 'password',
  sharedSecret: 'sharedSecret',
  // Optional properties
  identitySecret: 'identitySecret',
  options: {
    key: 'You can specify additional options'
  },
  headers: {
    key: 'You can specify additional headers'
  },
  proxy: null // Format protocol://username:password@host:port
}

const bot = new SteamRobot(account)

bot.use(async (steam, account, next) => {
  console.log('First middleware')

  // The steam object contains:
  // - totp (steam-totp)
  // - client (steam-user)
  // - community (steamcommunity)
  // - manager (steam-tradeoffer-manager)
  // - market (steam-market)

  // The account object is a copy of the bot creation object
  // You can specify your own account.options and get them inside middleware

  // Call to move to the next middlware
  await next()
})

bot.use(async (steam, account, next) => {
  console.log('Second middleware')
  await next()
})

// Run at 60 seconds interval (default)
await bot.start(60 * 1000)

// Stop middlewares and exit Steam
bot.stop()
```

### Manual style

```javascript
import SteamRobot from 'steam-robot'

// Account object for creating a bot
const account = {
  // Required properties
  username: 'username',
  password: 'password',
  sharedSecret: 'sharedSecret',
  // Optional properties
  identitySecret: 'identitySecret',
  options: {
    key: 'You can specify additional options'
  },
  headers: {
    key: 'You can specify additional headers'
  },
  proxy: null // Format protocol://username:password@host:port
}

const bot = new SteamRobot(account)

// You can work with the Steam object directly without using use()
const steam = await bot.start()

// The steam object contains:
// - totp (steam-totp)
// - client (steam-user)
// - community (steamcommunity)
// - manager (steam-tradeoffer-manager)
// - market (steam-market)

// An example of using the steam object
const search = await steam.market.search(730)
console.log('search', search.success)

// Exit Steam
bot.stop()
```

## See also

| Module                                                                                   | Description                                                             | Author            |
|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|-------------------|
| [steam-totp](https://github.com/DoctorMcKay/node-steam-totp)                             | Lightweight module to generate Steam-style TOTP auth codes              | DoctorMcKay       |
| [steam-user](https://github.com/DoctorMcKay/node-steam-user)                             | Allows interaction with the Steam network via the Steam client protocol | DoctorMcKay       |
| [steamcommunity](https://github.com/DoctorMcKay/node-steamcommunity)                     | Interact with various interfaces on Steam Community from Node.js        | DoctorMcKay       |
| [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager) | Simple and sane Steam trade offer management                            | DoctorMcKay       |
| [steam-market](https://github.com/vladislav-puzyrev/steam-market)                        | Steam market API client                                                 | Vladislav Puzyrev |
| [steam-robot](https://github.com/vladislav-puzyrev/steam-robot) (YOU HERE)               | Steam bots creating based on middlewares                                | Vladislav Puzyrev |
