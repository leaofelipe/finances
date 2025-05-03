const express = require('express')
const router = new express.Router()

router.get('/', (request, response) => {
  response.send('OK')
})

module.exports = router
