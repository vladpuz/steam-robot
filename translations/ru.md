# steam-robot

Создание steam ботов на основе middlewares, которые бесконечно вызываются по заданному интервалу. Полезно при создании
бесконечно работающих ботов.

TypeDoc документация доступна на [wiki](https://github.com/vladislav-puzyrev/steam-robot/wiki)

## Установка

```bash
npm install steam-robot
```

## Использование

```javascript
import SteamRobot from 'steam-robot'

// Объект аккаунта для создания бота
const account = {
  username: 'username',
  password: 'password',
  sharedSecret: 'sharedSecret',
  identitySecret: 'identitySecret',
  options: {
    key: 'Вы можете указать дополнительные опции'
  },
  headers: {
    key: 'Вы можете указать дополнительные заголовки'
  },
  proxy: 'protocol://username:password@host:port'
}

const bot = new SteamRobot(account)

bot.use(async (steam, account, next) => {
  console.log('First middleware')

  // Объект steam содержит:
  // - totp (steam-totp)
  // - client (steam-user)
  // - community (steamcommunity)
  // - manager (steam-tradeoffer-manager)
  // - market (steam-market)

  // Объект account это копия объекта для создания бота
  // Вы можете указывать собственные account.options и получать их внутри middleware

  // Вызовите чтобы перейти к следующему middlware
  await next()
})

bot.use(async (steam, account, next) => {
  console.log('Second middleware')
  await next()
})

// Запуск с интервалом 60000мс
// Второй параметр опционален, он вызывается единоразово перед запуском middlewares
await bot.start(60000, async (steam, account) => {})
```

## Смотрите также

| Модули                                                                                   | Описание                                   | Автор             |
|------------------------------------------------------------------------------------------|--------------------------------------------|-------------------|
| [steam-totp](https://github.com/DoctorMcKay/node-steam-totp)                             | Генерация кодов авторизации TOTP для steam | DoctorMcKay       |
| [steam-user](https://github.com/DoctorMcKay/node-steam-user)                             | Взаимодействие с сетью steam               | DoctorMcKay       |
| [steamcommunity](https://github.com/DoctorMcKay/node-steamcommunity)                     | Взаимодействие с сообществом steam         | DoctorMcKay       |
| [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager) | Управление предложениями обмена steam      | DoctorMcKay       |
| [steam-market](https://github.com/vladislav-puzyrev/steam-market)                        | Клиент API торговой площадки steam         | Vladislav Puzyrev |
| [steam-robot](https://github.com/vladislav-puzyrev/steam-robot) (ВЫ ЗДЕСЬ)               | Создание steam ботов на основе middlewares | Vladislav Puzyrev |
