# steam-robot

Creating steam bots based on middlewares, which are infinitely called at a given interval. Useful when creating
endlessly running bots.

TypeDoc documentation is available on [wiki](https://github.com/vladislav-puzyrev/steam-robot/wiki)

## Install

```bash
npm install steam-robot
```

## Usage

```javascript
import SteamRobot from 'steam-robot'

// Account object for creating a bot
const account = {
  username: 'username',
  password: 'password',
  sharedSecret: 'sharedSecret',
  identitySecret: 'identitySecret',
  options: {
    key: 'You can specify additional options'
  },
  headers: {
    key: 'You can specify additional headers'
  },
  proxy: 'protocol://username:password@host:port'
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

// Start with an interval of 60000ms
// The second parameter is optional, it is called once before starting middlewares
await bot.start(60000, async (steam, account) => {})
```

## See also

| Modules                                                                                  | Description                              | Author            |
|------------------------------------------------------------------------------------------|------------------------------------------|-------------------|
| [steam-totp](https://github.com/DoctorMcKay/node-steam-totp)                             | Generating TOTP auth codes for steam     | DoctorMcKay       |
| [steam-user](https://github.com/DoctorMcKay/node-steam-user)                             | Interaction with the steam network       | DoctorMcKay       |
| [steamcommunity](https://github.com/DoctorMcKay/node-steamcommunity)                     | Interaction with the steam community     | DoctorMcKay       |
| [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager) | Steam trade offer management             | DoctorMcKay       |
| [steam-market](https://github.com/vladislav-puzyrev/steam-market)                        | Steam community market API client        | Vladislav Puzyrev |
| [steam-robot](https://github.com/vladislav-puzyrev/steam-robot) (YOU HERE)               | Creating steam bots based on middlewares | Vladislav Puzyrev |
