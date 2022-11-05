const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../models')
const config = require('../config')

module.exports = async (accessToken, password) => {
  const user = await models.User.findOne({ where: { accessToken } })
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.getPasswordHash())
    : false
  return passwordCorrect
    ? jwt.sign({ id: user.id }, config.secret, { expiresIn: config.authTokenExpiration })
    : null
}
