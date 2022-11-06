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
      isActive: true,
    },
  })
  if (tasks.length === 0)
    return res.json(null)
  res.json(tasks[Math.floor(Math.random() * tasks.length)])
})

router.post('/createSubmission', async (req, res) => {
  // it's a mess but it seems to work
  const submissionTask = await models.Task.findOne({ where: {
    id: req.body.taskId,
  } })
  if (!submissionTask) {
    res.status(400)
    return res.json({
      error: 'invalid taskId',
    })
  }
  const submission = await models.Submission.build({
    answerText: req.body.answerText,
    succeeded: req.body.succeeded,
  })
  await submission.save()
  await submission.setTask(submissionTask)
  await submission.setUser(req.user)
  submission.Task = await submission.getTask()
  res.json(submission)
})

router.get('/statistics', async (req, res) => {
  const statistics = {}
  const submissions = await req.user.getSubmissions({
    include: [models.Task],
  })
  statistics.totalPoints = submissions.reduce((sum, current) => {
    return sum + (current.succeeded ? current.Task.points : 0)
  }, 0)
  const succeededSubmissions = submissions.filter(s => s.succeeded)
  const succeededDates = Array.from(new Set(
    succeededSubmissions.map(
      s => s.createdAt.toISOString().split('T')[0]
    )
  ))
    .map(s => new Date(s + 'T00:00:00'))
    .sort((a, b) => a - b)
  const sd = succeededDates
  const msInDay = 1000 * 60 * 60 * 24
  let yombocombo = 0
  let comboAtRisk = true
  // oh my
  const currentDate = new Date((new Date()).toISOString().split('T')[0] + 'T00:00:00')
  if (sd.length === 1 && currentDate - sd[0] === msInDay) {
    yombocombo = 1
  } else {
    for (let i = 1; i < sd.length; i++) {
      if (sd[i] - sd[i-1] === msInDay) {
        yombocombo++
      } else {
        break
      }
    }
  }
  // add 1 to combo and assess the risk be checking today
  if (sd.length > 0 && sd[sd.length - 1] - currentDate === 0) {
    // we've done a task today
    yombocombo++
    comboAtRisk = false
  }
  statistics.yomboNick = req.user.yomboNick
  statistics.succeededDates = succeededDates
  statistics.totalDays = succeededDates.length
  statistics.yombocombo = yombocombo
  statistics.currentDate = currentDate
  statistics.comboAtRisk = comboAtRisk
  statistics.percentSucceeded =
    Math.ceil(succeededSubmissions.length / submissions.length * 100) || 100
  statistics.numberOfSucceededTasks = succeededSubmissions.length
  statistics.numberOfAnswerWords =
    submissions.map(s => s.answerText.split(' ')).flat().length
  statistics.succeededTasksByCategory = {
    CONTACT: succeededSubmissions.filter(s => s.Task.category === 'CONTACT').length,
    COLLABORATE: succeededSubmissions.filter(s => s.Task.category === 'COLLABORATE').length,
    CONSIDER: succeededSubmissions.filter(s => s.Task.category === 'CONSIDER').length,
  }
  res.json(statistics)
})

router.get('/submissions', async (req, res) => {
  const submissions = await req.user.getSubmissions({
    include: [models.Task],
  })
  res.json(submissions)
})

module.exports = router
