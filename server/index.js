const express = require('express')
const app = require('./app')
const models = require('./models')
const config = require('./config')
const logger = require('./utils/logger')

const port = config.port
;(async () => {
  logger.log('Syncing database...')
  await models.sequelize.sync()
  logger.log('Database synced.')
  app.listen(port, () => {
    logger.log(`YOMBO server listening on port ${port}`)
  })
})()
