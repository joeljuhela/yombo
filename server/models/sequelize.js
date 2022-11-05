const { Sequelize, Model, DataTypes } = require('sequelize')

module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/dev.sqlite3',
})

