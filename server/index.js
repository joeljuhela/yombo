const express = require('express')
const app = require('./app')
const config = require('./config')

const port = config.port
app.listen(port, () => {
  console.log(`YOMBO server listening on port ${port}`)
})
