const crypto = require('crypto')
require('dotenv').config()

module.exports = {
  apiBase: '/api/v1',
  port: Number.parseInt(process.env.PORT) || 3000,
  authTokenExpiration: 8 * 60 * 60, // 8 hours
  saltRounds: 10,
  env: process.env.NODE_ENV || 'development',
  secret: process.env.SECRET,
  db: {
    development: {
      dialect: 'sqlite',
      storage: 'db/dev.sqlite3',
    },
    production: {
      dialect: 'sqlite',
      storage: 'db/prod.sqlite3',
    },
  },
}
