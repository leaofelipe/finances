const express = require('express')
const categoriesRoute = require('./categories')
const transactionsRoute = require('./transactions')
const ammountRoute = require('./ammount')
const budget = require('./budget')
const router = new express.Router()

router.get('/', (request, response) => {
  response.send('OK')
})

router.use('/categories', categoriesRoute)
router.use('/transactions', transactionsRoute)
router.use('/ammount', ammountRoute)
router.use('/budget', budget)

module.exports = router
