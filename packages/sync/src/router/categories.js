const express = require('express')
const Categories = require('../controllers/categories')
const router = new express.Router()

router.get('/', Categories.getCategories.bind(Categories))

module.exports = router
