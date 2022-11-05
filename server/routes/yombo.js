const router = require('express').Router()

// we can now trust `req.user`

router.get('/dailyTasks', async (req, res) => {
  res.json(await req.user.getTasks())
})

router.post('/createSubmission', async (req, res) => {
  await req.user.createSubmission({
    ...req.body,
  })
  await submission.setTask(req.body.taskId)
})

module.exports = router
