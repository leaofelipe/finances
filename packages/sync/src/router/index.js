const express = require('express')
const categoriesRoute = require('./categories')
const router = new express.Router()

router.get('/', (request, response) => {
  response.send('OK')
})

router.use('/categories', categoriesRoute)

module.exports = router
