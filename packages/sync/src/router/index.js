const express = require('express')
const categoriesRoute = require('./categories')
const transactionsRoute = require('./transactions')
const router = new express.Router()

router.get('/', (request, response) => {
  response.send('OK')
})

router.use('/categories', categoriesRoute)
router.use('/transactions', transactionsRoute)

module.exports = router
