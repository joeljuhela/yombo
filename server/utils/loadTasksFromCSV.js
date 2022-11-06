const { readFile } = require('fs/promises')
const { parse } = require('csv-parse/sync')
const models = require('../models')
const logger = require('./logger')

module.exports = async () => {
  const input = await readFile('./assets/tasks.csv')

  const taskData = parse(input, {
    columns: true,
    skip_empty_lines: true,
  })

  await models.sequelize.sync()

  const createdTasks = []
  const allPromises = await Promise.all(taskData.map(async (d) => {
    const previousTask = await models.Task.findOne({ where: {
      beforeText: d.beforeText,
      isActive: true,
    } })
    if (!previousTask) {
      const createdTask = await models.Task.create(d)
      createdTasks.push(createdTask)
    }
  }))
  logger.log(`Loaded ${allPromises.length} Tasks from CSV. ${createdTasks.length} of them were new.`)
  return createdTasks
}
