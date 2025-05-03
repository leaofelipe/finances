const Organizze = require('../services/organizze')
const Transaction = require('../models/Transaction')

const MONTH_START_DAY = '01'
const BASE_YEAR = new Date().getFullYear()
const BASE_MONTH = new Date().getMonth() + 1

class Transactions {
  constructor() {
    this.transactions = {}
  }

  async fetch(date) {
    const transactionsResponse = await Organizze.getTransactions(date)
    this.transactions = transactionsResponse.map((transaction) => {
      return new Transaction(transaction)
    })
    return this.transactions
  }

  async getTransactions(request, response) {
    const { year = BASE_YEAR, month = BASE_MONTH } = request.query
    const date = `${year}-${month}-${MONTH_START_DAY}`
    try {
      await this.fetch(date)
      response.status(200).send(this.transactions)
    } catch (error) {
      console.error('Error fetching transactions:', error)
      response.status(500).send('Internal Server Error')
    }
  }
}

module.exports = new Transactions()
