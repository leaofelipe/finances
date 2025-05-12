const Budget = require('../models/Budget')
const isValidMonth = require('../utils/isValidMonth')

class BudgetController {
  async create(request, response) {
    const { name } = request.body
    try {
      const budget = new Budget(name)
      await budget.create(name)
      response.status(200).send(budget.data)
    } catch (error) {
      console.error(error)
      response.status(500).send('Failed to create budget')
    }
  }

  async getBudget(request, response) {
    const { id } = request.params
    try {
      const budget = new Budget(id)
      await budget.fetch()
      response.status(200).send(budget.data)
    } catch (error) {
      console.error(error)
      response.status(500).send('Failed to get budget document')
    }
  }

  async setMonth(request, response) {
    const { id, month } = request.params
    const { amount } = request.body
    try {
      if (!isValidMonth(parseInt(month, 10))) throw new Error('Invalid month')
      const budget = new Budget(id)
      await budget.setMonth(month, amount)
      await budget.fetch()
      response.status(200).send(budget.data)
    } catch (error) {
      console.error(error)
      response.status(500).send('Failed to set month')
    }
  }

  async getMonth(request, response) {
    const { id, month } = request.params
    try {
      const budget = new Budget(id)
      await budget.fetch()
      response.status(200).send(budget.months[month])
    } catch (error) {
      console.error(error)
      response.status(500).send('Failed to get month')
    }
  }

  async delete(request, response) {
    const { id } = request.params
    try {
      const budget = new Budget(id)
      await budget.delete()
      response.status(204).send()
    } catch (error) {
      console.error(error)
      response.status(500).send('Failed to delete budget')
    }
  }

  async getBudgets(request, response) {
    try {
      const budgets = await Budget.getBudgets()
      response.status(200).send(budgets)
    } catch (error) {
      console.error(error)
      response.status(500).send('Failed to get budgets')
    }
  }
}

module.exports = new BudgetController()
