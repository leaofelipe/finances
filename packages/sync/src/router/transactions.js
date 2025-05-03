const express = require('express')
const Transactions = require('../controllers/transactions')
const router = new express.Router()

router.get('/', Transactions.getTransactions.bind(Transactions))

module.exports = router
