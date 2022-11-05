const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('./models')
const config = require('./config')
const hashPassword = require('./utils/hashPassword')

const router = express.Router()

const login = async (accessToken, password) => {
  const user = await models.User.findOne({ where: { accessToken } })
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.getPasswordHash())
    : false
  return passwordCorrect
    ? jwt.sign({ id: user.id }, config.secret, { expiresIn: config.authTokenExpiration })
    : null
}

router.post('/createYombo', async (req, res) => {
  const user = await models.User.create({
    ...req.body,
    passwordHash: await hashPassword(req.body.password),
  })
  res.json({
    ...user.toJSON(),
    authToken: await login(user.accessToken, req.body.password)
  })
})

router.post('/:accessToken/login', async (req, res) => {
  const authToken = await login(req.params.accessToken, req.body.password)
  res.json({
    authToken,
  })
})

module.exports = router
