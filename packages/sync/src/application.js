const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const router = require('./router')

const API = express()
  .use(helmet())
  .use(cors())
  .use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  .disable('x-powered-by')
  .use(express.json())
  .use(router)

module.exports = API
