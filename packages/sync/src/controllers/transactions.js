const TransactionsModel = require('../models/Transactions')
const BASE_YEAR = new Date().getFullYear()
const BASE_MONTH = new Date().getMonth() + 1

class Transactions {
  constructor() {
    this.transactions = {}
  }

  async getTransactions(request, response) {
    const { year = BASE_YEAR, month = BASE_MONTH } = request.query
    const date = { year, month }
    try {
      this.transactions = await TransactionsModel.getTransactions(date)
      response.status(200).send(this.transactions)
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }
}

module.exports = new Transactions()
