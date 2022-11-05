const models = require('../models')
const hashPassword = require('./hashPassword')

module.exports = async () => {
  await models.sequelize.sync({ force: true })
  const u1 = await models.User.create({
    yomboNick: 'Sambo',
    passwordHash: await hashPassword('password'),
  })
  const t1 = await models.Task.create({
    category: 'CONTACT',
    points: 55,
    beforeText: 'Call a friend',
    tips: 'Talk about the weather',
    successText: 'Well done!',
    failText: 'Oh no! Try this again later',
  })
  const t2 = await models.Task.create({
    category: 'CONSIDER',
    points: 30,
    beforeText: 'What makes you nervous about social situations?',
    tips: 'Tips for the task',
    successText: 'Well done!',
    failText: 'Oh no! Try this again later',
  })
  const s1 = await u1.createSubmission({
    answerText: 'Couldn\'t do this today',
    succeeded: false,
  })
  await s1.setTask(t1)
  const s2 = await u1.createSubmission({
    answerText: 'I think I overanalyze what others think about me 🤔',
    succeeded: true,
  })
  await s2.setTask(t1)

  // set daily tasks
  await u1.setTasks([
    t1,
  ])
}
