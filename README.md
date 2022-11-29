# steam-robot

Creating steam bots based on middlewares, which are infinitely called at a given interval.

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

// Wrapping the code in an asynchronous function to use await
const main = async () => {
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
  await bot.start(60000)
}

main()
```

## See also

| Modules                                                                                     | Description                               | Author            |
|---------------------------------------------------------------------------------------------|-------------------------------------------|-------------------|
| [steam-totp](https://github.com/DoctorMcKay/node-steam-totp)                                | Generating TOTP auth codes for steam      | DoctorMcKay       |
| [steam-user](https://github.com/DoctorMcKay/node-steam-user)                                | Interaction with the steam network        | DoctorMcKay       |
| [steamcommunity](https://github.com/DoctorMcKay/node-steamcommunity)                        | Interaction with the steam community      | DoctorMcKay       |
| [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager)    | Steam trade offer management              | DoctorMcKay       |
| [steam-market](https://github.com/vladislav-puzyrev/steam-market)                           | Steam community market API client         | Vladislav Puzyrev |
| [steam-robot](https://github.com/vladislav-puzyrev/steam-robot) (YOU HERE)                  | Creating steam bots based on middlewares  | Vladislav Puzyrev |

# API

## Table of contents

### Classes

- [default](#classesdefaultmd)

### Interfaces

- [Account](#interfacesaccountmd)
- [Steam](#interfacessteammd)

### Type Aliases

- [Middleware](#middleware)

## Type Aliases

### Middleware

Ƭ **Middleware
**<`AccountOptions`\>: (`steam`: [`Steam`](#interfacessteammd), `account`: [`Account`](#interfacesaccountmd)<`AccountOptions`\>, `next`: () => `Promise`<`void`\>) => `Promise`<`void`\>

#### Type parameters

| Name             | Type   |
|:-----------------|:-------|
| `AccountOptions` | `void` |

#### Type declaration

▸ (`steam`, `account`, `next`): `Promise`<`void`\>

##### Parameters

| Name      | Type                                                 |
|:----------|:-----------------------------------------------------|
| `steam`   | [`Steam`](#interfacessteammd)                        |
| `account` | [`Account`](#interfacesaccountmd)<`AccountOptions`\> |
| `next`    | () => `Promise`<`void`\>                             |

##### Returns

`Promise`<`void`\>

#### Defined in

[types/Middleware.ts:4](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Middleware.ts#L4)

# Class: default<AccountOptions\>

## Type parameters

| Name             | Type   |
|:-----------------|:-------|
| `AccountOptions` | `void` |

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [account](#account)
- [middlewares](#middlewares)

### Methods

- [start](#start)
- [use](#use)

## Constructors

### constructor

• **new default**<`AccountOptions`\>(`account`)

#### Type parameters

| Name             | Type   |
|:-----------------|:-------|
| `AccountOptions` | `void` |

#### Parameters

| Name      | Type                                                 |
|:----------|:-----------------------------------------------------|
| `account` | [`Account`](#interfacesaccountmd)<`AccountOptions`\> |

#### Defined in

[SteamRobot.ts:14](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/SteamRobot.ts#L14)

## Properties

### account

• `Private` `Readonly` **account**: [`Account`](#interfacesaccountmd)<`AccountOptions`\>

#### Defined in

[SteamRobot.ts:11](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/SteamRobot.ts#L11)

___

### middlewares

• `Private` `Readonly` **middlewares**: [`Middleware`](#middleware)<`AccountOptions`\>[] = `[]`

#### Defined in

[SteamRobot.ts:12](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/SteamRobot.ts#L12)

## Methods

### start

▸ **start**(`interval`): `Promise`<`void`\>

#### Parameters

| Name       | Type     |
|:-----------|:---------|
| `interval` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[SteamRobot.ts:22](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/SteamRobot.ts#L22)

___

### use

▸ **use**(`middleware`): `void`

#### Parameters

| Name         | Type                                           |
|:-------------|:-----------------------------------------------|
| `middleware` | [`Middleware`](#middleware)<`AccountOptions`\> |

#### Returns

`void`

#### Defined in

[SteamRobot.ts:18](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/SteamRobot.ts#L18)

# Interface: Account<AccountOptions\>

## Type parameters

| Name             | Type   |
|:-----------------|:-------|
| `AccountOptions` | `void` |

## Table of contents

### Properties

- [headers](#headers)
- [identitySecret](#identitysecret)
- [options](#options)
- [password](#password)
- [proxy](#proxy)
- [sharedSecret](#sharedsecret)
- [username](#username)

## Properties

### headers

• `Optional` **headers**: `Record`<`string`, `string`\>

#### Defined in

[types/Account.ts:7](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Account.ts#L7)

___

### identitySecret

• **identitySecret**: `string`

#### Defined in

[types/Account.ts:5](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Account.ts#L5)

___

### options

• `Optional` **options**: ``null`` \| `AccountOptions`

#### Defined in

[types/Account.ts:6](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Account.ts#L6)

___

### password

• **password**: `string`

#### Defined in

[types/Account.ts:3](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Account.ts#L3)

___

### proxy

• `Optional` **proxy**: ``null`` \| `string`

#### Defined in

[types/Account.ts:8](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Account.ts#L8)

___

### sharedSecret

• **sharedSecret**: `string`

#### Defined in

[types/Account.ts:4](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Account.ts#L4)

___

### username

• **username**: `string`

#### Defined in

[types/Account.ts:2](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Account.ts#L2)

# Interface: Steam

## Table of contents

### Properties

- [client](#client)
- [community](#community)
- [manager](#manager)
- [market](#market)
- [totp](#totp)

## Properties

### client

• **client**: `SteamUser`

#### Defined in

[types/Steam.ts:9](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Steam.ts#L9)

___

### community

• **community**: `SteamCommunity`

#### Defined in

[types/Steam.ts:10](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Steam.ts#L10)

___

### manager

• **manager**: `any`

#### Defined in

[types/Steam.ts:11](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Steam.ts#L11)

___

### market

• **market**: `SteamMarket`

#### Defined in

[types/Steam.ts:12](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Steam.ts#L12)

___

### totp

• **totp**: `__module`

#### Defined in

[types/Steam.ts:8](https://github.com/vladislav-puzyrev/steam-robot/blob/1612afd/src/types/Steam.ts#L8)
