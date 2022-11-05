const logger = require('../utils/logger')

module.exports = (err, req, res, next) => {
  logger.error(err)
  if (err.name && err.name.toLowerCase().includes('sequelize')) {
    res.status(400)
    res.json({
      error: err.toString(),
    })
  } else {
    next()
  }
}
