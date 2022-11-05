const models = require('../models')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
const config = require('../config')

const getToken = (req) => {
  const authHeader = req.get('authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) return null
  return authHeader.substring('bearer '.length)
}

const getId = (token) => {
  if (!token) return null
  try {
    const decodedToken = jwt.verify(token, config.secret)
    return decodedToken.id
  // 🤷‍♂️
  } catch (e) {
    logger.error(e)
    return null
  }
}

module.exports = async (req, res, next) => {
  const token = getToken(req)
  const id = getId(token)
  req.user = await models.User.findOne({
    where: { id },
  })
  next()
}
