const express = require('express')
const app = require('./app')
const models = require('./models')
const config = require('./config')
const logger = require('./utils/logger')
const loadTasksFromCSV = require('./utils/loadTasksFromCSV')

const port = config.port
;(async () => {
  logger.log('Syncing database...')
  await models.sequelize.sync()
  logger.log('Database synced.')
  logger.log('Load possible new tasks from the CSV...')
  const loadedTasks = await loadTasksFromCSV()
  if (!config.secret) {
    logger.error('$SECRET is not set!')
    process.exit(5)
  }
  app.listen(port, () => {
    logger.log(`YOMBO ${config.env} server listening on port ${port}`)
  })
})()
