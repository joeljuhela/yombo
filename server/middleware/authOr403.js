module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(403)
    res.json({
      error: 'forbidden'
    })
    return
  }
  next()
}
