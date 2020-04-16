# Surveyor API

## Summary

This API supports the Surveyor client app as the back end. Demo for api is
located at [surveyor-api.karleypetracca.com](http://surveyor-api.karleypetracca.com)

Client
repo can be viewed on [GitHub](https://github.com/karleypetracca/surveyor-client)
or as a demo site at
[surveyor.karleypetracca.com](http://surveyor.karleypetracca.com)

## Features

The Surveyor API was built in Express and features a schema built with a full
survey site in mind. The Surveyor Client gets and posts data to populate its
site via this API. The API is connected to a PostgreSQL database.

Future features could include user authentication and more capability on survey
question types.

## Installation

### Clone

- Clone this repo to your local machine

### Setup

install npm packages

```
$ npm i
```

- Create postgreSQL database based on sql files in models folder:
  1. Run functions from "function.sql"
  2. Build tables and sample data from "schema.sql"
- Connect database info accordingly via .env file

_Sample/template .env below:_

```
DB_HOST=YOUR DB_HOST_HERE
DB_NAME=YOUR_DB_NAME_HERE
DB_USER=YOUR_DB_USERNAME_HERE
DB_PW=YOUR_DB_PASSWORD_HERE
PORT=8100
```

- run program (code below requires nodemon)

```
$ npm run dev
```

## Author:

- Karley Petracca - [GitHub](https://github.com/karleypetracca)
