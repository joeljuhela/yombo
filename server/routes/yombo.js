const router = require('express').Router()
const { Op } = require('sequelize')
const models = require('../models')

// we can now trust `req.user`

router.get('/dailyTask', async (req, res) => {
  const categories = [
    'CONTACT',
    'COLLABORATE',
    'CONSIDER',
  ]
  let category = req.query.category
  if (!category || !categories.includes(category)) {
    res.status(400)
    return res.json({
      error: 'GET parameter `category` unavailable or incorrect'
    })
  }
  const lessPointsThan = req.query.lessPointsThan || Number.MAX_VALUE
  const tasks = await models.Task.findAll({
    where: {
      points: {
        [Op.lt]: lessPointsThan,
      },
      category,
    },
  })
  if (tasks.length === 0)
    return res.json(null)
  res.json(tasks[Math.floor(Math.random() * tasks.length)])
})

router.post('/createSubmission', async (req, res) => {
  await req.user.createSubmission({
    ...req.body,
  })
  await submission.setTask(req.body.taskId)
})

module.exports = router
