const BudgetModel = require('../models/Budget')

class Budget {
  async getData(request, response) {
    try {
      const budget = await BudgetModel.getBudget()
      response.status(200).send(budget)
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }
}

module.exports = new Budget()
