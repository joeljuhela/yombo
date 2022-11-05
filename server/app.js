const express = require('express')
const models = require('./models')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app
