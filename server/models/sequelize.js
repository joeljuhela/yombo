const { Sequelize, Model, DataTypes } = require('sequelize')
const config = require('../config')

module.exports = new Sequelize(config.db[config.env])

