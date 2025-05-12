const express = require('express')
const Budget = require('../controllers/budget')
const router = new express.Router()

router.get('/', Budget.getBudgets.bind(Budget))
router.get('/:id', Budget.getBudget.bind(Budget))
router.delete('/:id', Budget.delete.bind(Budget))
router.post('/', Budget.create.bind(Budget))
router.post('/:id/month/:month', Budget.setMonth.bind(Budget))
router.get('/:id/month/:month', Budget.getMonth.bind(Budget))

module.exports = router
