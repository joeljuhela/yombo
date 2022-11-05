const bcrypt = require('bcrypt')
const config = require('../config')

module.exports = async (password) => {
  return await bcrypt.hash(password, config.saltRounds)
}
