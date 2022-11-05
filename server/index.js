const express = require('express')
const app = require('./app')
const config = require('./config')
const cors = require('cors')

const port = config.port
app.use(cors())
app.listen(port, () => {
  console.log(`YOMBO server listening on port ${port}`)
})
