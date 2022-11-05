const express = require('express')
const config = require('./config')
const models = require('./models')
const accounts = require('./routes/accounts')
const yombo = require('./routes/yombo')
const getUser = require('./middleware/getUser')
const authOr403 = require('./middleware/authOr403')
const app = express()

app.use(express.json())
app.use(config.apiBase, accounts)
app.use(`${config.apiBase}/:accessToken`, getUser, authOr403, yombo)

module.exports = app
