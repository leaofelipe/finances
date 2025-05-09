const express = require('express')
const Budget = require('../controllers/budget')
const router = new express.Router()

router.get('/', Budget.getData.bind(Budget))

module.exports = router
