const express = require('express')
const config = require('./config')
const models = require('./models')
const apiRouter = require('./apiRouter')
const getUser = require('./middleware/getUser')
const app = express()

app.use(express.json())
app.use(getUser)
app.use(config.apiBase, apiRouter)

module.exports = app
