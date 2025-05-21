const express = require('express')
const categoriesRoute = require('./categories')
const budgetRoute = require('./budget')
const syncRoute = require('./sync')
const router = new express.Router()

router.get('/', (request, response) => {
  response.send('OK')
})

router.use('/categories', categoriesRoute)
router.use('/budgets', budgetRoute)
router.use('/sync', syncRoute)

module.exports = router
