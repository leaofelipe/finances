const express = require('express')
const SyncController = require('../controllers/sync.controller')
const router = new express.Router()

router.get('/', SyncController.start.bind(SyncController))

module.exports = router
