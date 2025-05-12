
## Запуск

Создай .env файл и добавь DATABASE_URL
```bash
$ npm install
# - ТОЛЬКО ДЛЯ РАЗРАБОТКИ! наполнит БД данными
$ npm run seed 
# Сгенерирует типы для фронтенда
$ npm run generate:types
# сгенерит клиент призмы
$ npm run prisma:generate

```





### Наполнение базы данных
в папке scripts/prepare лежит http скрипт, который дергает несколько ручек и добавляет начальные данные в БД, чтобы не делать это каждый раз руками.

-----

## Запуск

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Тесты
Основные тесты - ручные http. Лежат в test/http

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Работа с БД

Для индексации в вебшторм сделать exlude папки /node_modules/.prisma и /node_modules/@prisma

```bash
# Запуск и анализ записей в БД
$ prisma studio
```
