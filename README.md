<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">DailyTrends</p>

## Description

Este feed es un agregador de noticias de diferentes periódicos. DailyTrends es un periódico que une las portadas de los periódicos número uno.
					
Cuando un usuario abre DailyTrends, se encuentra con las 5 noticias de portada de El País y El Mundo del día en el que lo abre, además se pueden añadir noticias a mano desde el API.


## Project setup

```bash
$ npm install
```
----
Tested on:
- MongoDB v8.0.4
- Node.js v22.12.0 LTS

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API
### Checking main functionality of DailyTrends
First execute the feed scraper:
{GET} http://localhost:3000/feeds/load

Then test the loaded feeds for today by sending a list request:
{GET} http://localhost:3000/feeds/

### API requests
```bash
# POST Feed. Useful for adding feeds manually
http://localhost:3000/feeds/
Body example:
{
  "feed": "el_mundo",
  "headline": "Prueba",
  "url": "http://url.prueba.test"
}

# GET List feeds
http://localhost:3000/feeds/

# GET Feed
http://localhost:3000/feeds/:id

# DELETE Feed
http://localhost:3000/feeds/:id

# PUT Feed
http://localhost:3000/feeds/:id
Body example:
{
  "feed": "el_mundo",
  "headline": "Prueba actualizada",
  "url": "http://url.prueba2.test"
}

# GET Load feeds. This executes the feed scraper
http://localhost:3000/feeds/load
```
