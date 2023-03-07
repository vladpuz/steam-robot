# steam-robot

Создание ботов Steam на основе middlewares, которые бесконечно вызываются по заданной задержке. Внутри он использует
модули из раздела [Смотрите также](#смотрите-также).

TypeDoc документация доступна на [wiki](https://github.com/vladislav-puzyrev/steam-robot/wiki).

## Установка

Используя npm:

```bash
npm install steam-robot
```

Используя yarn:

```bash
yarn add steam-robot
```

## Использование

### В стиле middlewares

```javascript
import SteamRobot from 'steam-robot'

// Объект аккаунта для создания бота
const account = {
  // Обязательные свойства
  username: 'username',
  password: 'password',
  sharedSecret: 'sharedSecret',
  // Опциональные свойства
  identitySecret: 'identitySecret',
  options: {
    key: 'Вы можете указать дополнительные опции'
  },
  headers: {
    key: 'Вы можете указать дополнительные заголовки'
  },
  proxy: null // Формат protocol://username:password@host:port
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

  // Вызовите чтобы перейти к следующему middleware
  await next()
})

bot.use(async (steam, account, next) => {
  console.log('Second middleware')
  await next()
})

// Запуск с интервалом 60 секунд (по умолчанию)
await bot.start(60 * 1000)

// Остановить middlewares и выйти из Steam
bot.stop()
```

### В ручном стиле

```javascript
import SteamRobot from 'steam-robot'

// Объект аккаунта для создания бота
const account = {
  // Обязательные свойства
  username: 'username',
  password: 'password',
  sharedSecret: 'sharedSecret',
  // Опциональные свойства
  identitySecret: 'identitySecret',
  options: {
    key: 'Вы можете указать дополнительные опции'
  },
  headers: {
    key: 'Вы можете указать дополнительные заголовки'
  },
  proxy: null // Формат protocol://username:password@host:port
}

const bot = new SteamRobot(account)

// Вы можете работать с объектом Steam напрямую не используя use()
const steam = await bot.start()

// Объект steam содержит:
// - totp (steam-totp)
// - client (steam-user)
// - community (steamcommunity)
// - manager (steam-tradeoffer-manager)
// - market (steam-market)

// Пример использования объекта steam
const search = await steam.market.search(730)
console.log('search', search.success)

// Выйти из Steam
bot.stop()
```

## Смотрите также

| Модуль                                                                                   | Описание                                                                  | Автор             |
|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|-------------------|
| [steam-totp](https://github.com/DoctorMcKay/node-steam-totp)                             | Легкий модуль для генерации кодов авторизации TOTP в стиле Steam          | DoctorMcKay       |
| [steam-user](https://github.com/DoctorMcKay/node-steam-user)                             | Позволяет взаимодействовать с сетью Steam через клиентский протокол Steam | DoctorMcKay       |
| [steamcommunity](https://github.com/DoctorMcKay/node-steamcommunity)                     | Взаимодействуйте с различными интерфейсами в сообществе Steam из Node.js  | DoctorMcKay       |
| [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager) | Простое и разумное управление торговыми предложениями Steam               | DoctorMcKay       |
| [steam-market](https://github.com/vladislav-puzyrev/steam-market)                        | Клиент API торговой площадки Steam                                        | Vladislav Puzyrev |
| [steam-robot](https://github.com/vladislav-puzyrev/steam-robot) (ВЫ ЗДЕСЬ)               | Создание ботов Steam на основе middlewares                                | Vladislav Puzyrev |
