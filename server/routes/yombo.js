const router = require('express').Router()

router.get('/dailyTasks', async (req, res) => {
  res.json(await req.user.getTasks())
})

module.exports = router
