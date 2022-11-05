const express = require('express')
const models = require('../models')
const config = require('../config')
const hashPassword = require('../utils/hashPassword')
const login = require('../utils/login')

const router = express.Router()

router.post('/createYombo', async (req, res) => {
  if (!req.body.password) {
    res.status(400)
    res.json({
      error: 'missing password parameter',
    })
    return
  }
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
