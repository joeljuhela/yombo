const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequelize')

class User extends Model {}
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
  },
}, {
  sequelize,
  modelName: 'User',
  defaultScope: {
    attributes: { exclude: ['passwordHash'] },
  },
})

sequelize.models.sequelize = sequelize

module.exports = sequelize.models
