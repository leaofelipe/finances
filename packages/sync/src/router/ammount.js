const express = require('express')
const Ammount = require('../controllers/ammount')
const router = new express.Router()

router.get('/', Ammount.getData.bind(Ammount))

module.exports = router
