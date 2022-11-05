const { readFile } = require('fs/promises')
const { parse } = require('csv-parse/sync')
const models = require('../models')
const logger = require('./logger')

;(async () => {
  const input = await readFile('./assets/tasks.csv')

  const taskData = parse(input, {
    columns: true,
    skip_empty_lines: true,
  })

  await models.sequelize.sync()

  const res = await Promise.all(taskData.map(d => {
    return models.Task.create(d)
  }))
  logger.log(`Loaded ${res.length} Tasks from CSV to database`)
})()
