const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequelize')

/* Define the models */
class User extends Model {
  getPasswordHash() {
    return this.dataValues.passwordHash
  }
}
User.init({
  yomboNick: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessToken: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return undefined
    },
  },
}, {
  sequelize,
  modelName: 'User',
})

class Task extends Model {}
const taskCategories = [
  'CONTACT',
  'COLLABORATE',
  'CONSIDER',
]
Task.init({
  category: {
    type: DataTypes.ENUM(...taskCategories),
    validate: {
      isIn: [taskCategories],
    },
  },
  points: {
    type: DataTypes.INTEGER,
  },
  beforeText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  successText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  failText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tips: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // if the task is deprecated (and shouldn't be assigned to players),
  // set this to true
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'Task',
})

class Submission extends Model {}
Submission.init({
  answerText: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // Sequelize creates `createdAt` timestamp automatically

  // did the user fail or succeed?
  succeeded: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Submission',
})


/* Define the associations */

// User's submitted tasks
User.hasMany(Submission)
Submission.belongsTo(User)

// Submissions always reference a Task
Task.hasMany(Submission)
Submission.belongsTo(Task)

// User has some daily Tasks
User.belongsToMany(Task, {
  through: 'DailyTasks',
})
Task.belongsToMany(User, {
  through: 'DailyTasks',
})

/* All set! Export time */

sequelize.models.sequelize = sequelize

module.exports = sequelize.models
