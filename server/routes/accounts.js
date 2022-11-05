const express = require('express')
const models = require('../models')
const config = require('../config')
const hashPassword = require('../utils/hashPassword')
const login = require('../utils/login')

const router = express.Router()

router.post('/createYombo', async (req, res) => {
  console.log(req.body)
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

//yomboNick?accessToken=aaaaa...
router.get('/yomboNick', async (req, res) => {
  const user = await models.User.findOne({
    where: {
      accessToken: req.query.accessToken,
    },
  })
  if (!user) {
    res.status(404)
    return res.json({
      error: 'not found',
      yomboNick: '',
    })
  }
  res.json({
    yomboNick: user.yomboNick,
  })
})

router.post('/login', async (req, res) => {
  const authToken = await login(req.body.accessToken, req.body.password)
  res.json({
    authToken,
  })
})

module.exports = router
