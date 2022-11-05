const crypto = require('crypto')

module.exports = {
  apiBase: '/api/v1',
  port: Number.parseInt(process.env.PORT) || 3000,
  authTokenExpiration: 8 * 60 * 60, // 8 hours
  saltRounds: 10,
  secret: process.env.SECRET || crypto.randomBytes(64).toString('hex'),
}
